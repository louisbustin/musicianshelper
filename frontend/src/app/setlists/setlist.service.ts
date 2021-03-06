import { Injectable } from "@angular/core";
import { EMPTY, merge, Observable, Subject } from "rxjs";
import { catchError, concatMap, scan, shareReplay } from "rxjs/operators";
import { BandService } from "../band/band.service";
import { ISetlist } from "./models/setlist.model";
import { WebRequestService } from "../shared/services/web-request.service";
import { ISetlistWithSongs } from "./models/setlist-with-songs.model";

@Injectable({
    providedIn: 'root'
  })
export class SetlistService {
    DELETEDTEXT = "THISSETLISTHASBEENDELETED";

    //list of setlists from serverside by band
    serverSetlistsByBand$: Observable<ISetlist[]> = this.bandService.selectedBand$.pipe(
        concatMap(band => this.webRequestService.get<ISetlist[]>(`setlists/byband/${band._id}`)),
        shareReplay(1)
    );

    //combine with a subject for a band to allow us to add a new band once it's added serverside
    private setlistToAdd$: Subject<ISetlist> = new Subject<ISetlist>();
    setlistToAddAction$: Observable<ISetlist> = this.setlistToAdd$.asObservable();

    private setlistToDelete$ = new Subject<ISetlist>();
    setlistToDeleteAction$ = this.setlistToDelete$.asObservable();

    setlists$: Observable<ISetlist[]>  = merge(
        this.serverSetlistsByBand$,
        this.setlistToAddAction$,
        this.setlistToDelete$
    ).pipe(
        scan((lists: ISetlist[], list: ISetlist) => {
            if (Array.isArray(list)) {
                return list;
            } else {
                const i = lists.findIndex(b => b._id === list._id);
                if (i >= 0) {
                    if (list.name === this.DELETEDTEXT) {
                        lists.splice(i, 1);
                        return [...lists];
                    } else {
                        lists[i] = list;
                        return [...lists];
                    }
                } else {
                    return [...lists, list];
                }
            }
        }),
        shareReplay(1)
    );


    constructor(
        private webRequestService: WebRequestService,
        private bandService: BandService
        ) { }

    addSetlist(list: ISetlist): void {
        this.webRequestService.post<ISetlist>("setlists", list).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).subscribe(addedList => {
            this.setlistToAdd$.next(addedList);
        });
    }

    editSetlist(list: ISetlist):void  {
        this.webRequestService.put(`setlists/${list._id}`, list).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).subscribe(changedList => {
            this.setlistToAdd$.next(changedList);
        });
    }

    //this will only save the songs to a setlist, not a 
    saveSetlistWithSongs(list: ISetlistWithSongs):void  {
        console.log(list);
        const songs = list.songs.map(x => {
            return { 'order': x.order, 'song': x.song._id}
        });
        const updateList = {
            _id: list._id,
            songs: songs
        }
        console.log(updateList);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.webRequestService.put<any>(`setlists/${list._id}`, updateList).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).subscribe(changedList => {
            this.setlistToAdd$.next(changedList);
        });
    }

    getSetlist(setlistId: string): Observable<ISetlistWithSongs> {
        return this.webRequestService.get<ISetlistWithSongs>(`setlists/${setlistId}`);
    }

    deleteSetlist(setlistId: string): void {
        this.webRequestService.delete<ISetlist>(`setlists/${setlistId}`).pipe(
            catchError(err => {
                console.log(err);
                return EMPTY;
            })
        ).subscribe((deletedList) => {
            deletedList.name = this.DELETEDTEXT;
            this.setlistToDelete$.next(deletedList);
        });
    }
}