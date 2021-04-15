import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ISetlist } from "../models/setlist.model";
import { WebRequestService } from "../shared/services/web-request.service";

@Injectable({
    providedIn: 'root'
  })
export class SetlistService {

    setlists$ = this.webRequestService.getTyped<ISetlist[]>('setlists');

    constructor(private webRequestService: WebRequestService) { }

    addSetlist(list: ISetlist) {
        this.webRequestService.post<ISetlist>("setlists", list).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).pipe(
            tap(s => console.log(s))
        ).subscribe(addedList => {
        });
    }

    editSetlist(list: ISetlist) {
        this.webRequestService.put(`setlists/${list._id}`, list).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).pipe(
            tap(s => console.log(s))
        ).subscribe(changedList => {
        });
    }

    getSetlistsByBandId(bandId: string) {
        return this.webRequestService.getTyped<ISetlist[]>(`setlists/byband/${bandId}`);
    }
}