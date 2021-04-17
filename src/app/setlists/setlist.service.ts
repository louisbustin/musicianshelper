import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { EMPTY, merge, Observable, Subject } from "rxjs";
import { catchError, concatMap, scan, shareReplay, tap } from "rxjs/operators";
import { BandService } from "../band/band.service";
import { ISetlist } from "../models/setlist.model";
import { WebRequestService } from "../shared/services/web-request.service";

@Injectable({
    providedIn: 'root'
  })
export class SetlistService implements OnInit, OnDestroy {

    //list of setlists from serverside by band
    serverSetlistsByBand$: Observable<ISetlist[]> = this.bandService.selectedBand$.pipe(
        concatMap(band => this.webRequestService.getTyped<ISetlist[]>(`setlists/byband/${band._id}`)),
        shareReplay(1)
    );

    //combine with a subject for a band to allow us to add a new band once it's added serverside
    private setlistToAdd$: Subject<ISetlist> = new Subject<ISetlist>();
    setlistToAddAction$: Observable<ISetlist> = this.setlistToAdd$.asObservable();

    setlists$: Observable<ISetlist[]>  = merge(
        this.serverSetlistsByBand$,
        this.setlistToAddAction$
    ).pipe(
        scan((lists: ISetlist[], addedList: ISetlist) => {
            if (Array.isArray(addedList)) {
                return addedList;
            } else {
                let i = lists.findIndex(b => b._id === addedList._id);
                if (i >= 0) {
                    lists[i] = addedList;
                    return [...lists];
                } else {
                    return [...lists, addedList];
                }
            }
        }),
        shareReplay(1)
    );

    constructor(
        private webRequestService: WebRequestService,
        private bandService: BandService
        ) { }

    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }

    addSetlist(list: ISetlist) {
        this.webRequestService.post<ISetlist>("setlists", list).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).pipe(
            tap(s => console.log(s))
        ).subscribe(addedList => {
            this.setlistToAdd$.next(addedList);
        });
    }

    editSetlist(list: ISetlist) {
        this.webRequestService.put(`setlists/${list._id}`, list).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).pipe(
            tap(s => console.log("edit"))
        ).subscribe(changedList => {
            this.setlistToAdd$.next(changedList);
        });
    }

    getSetlist(setlistId: string) {
        return this.webRequestService.getTyped<ISetlist>(`setlists/${setlistId}`);
    }
}