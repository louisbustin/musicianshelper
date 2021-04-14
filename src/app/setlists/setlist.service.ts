import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { catchError, shareReplay, tap } from "rxjs/operators";
import { ISetlist } from "../models/setlist.model";
import { WebRequestService } from "../shared/services/web-request.service";

@Injectable({
    providedIn: 'root'
  })
export class SetlistService {

    setlists$ = this.webRequestService.getTyped<ISetlist[]>('setlists')
    .pipe(
        shareReplay(1)
    );

    constructor(private webRequestService: WebRequestService) { }

    addSetlist(list: ISetlist) {
        this.webRequestService.post<ISetlist>("setlists", list).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).pipe(
            tap(s => console.log(s))
        ).subscribe(addedBand => {
            //this.bandToAdd$.next(addedBand);
        });
    }
}