import { Injectable } from "@angular/core";
import { Subject, Observable, merge, EMPTY } from "rxjs";
import { catchError, scan, shareReplay } from "rxjs/operators";
import { IBand } from '../models/band.model'
import { WebRequestService } from "../shared/services/web-request.service";

@Injectable({
    providedIn: 'root'
  })
export class BandService {
   
    readonly BASE_PATH: string = 'bands';

    constructor(private webRequestService: WebRequestService) { }
    
    //list of bands from serverside. using "sharedReplay" to cache these locally
    serverBands$: Observable<IBand[]> = this.webRequestService.get<IBand[]>(this.BASE_PATH)
    .pipe(
        shareReplay(1)
    );

    //combine with a subject for a band to allow us to add a new band once it's added serverside
    private bandToAdd$ = new Subject<IBand>();
    bandToAddAction$ = this.bandToAdd$.asObservable();
    bands$: Observable<IBand[]> = merge(
        this.serverBands$,
        this.bandToAddAction$
    ).pipe(
        scan((bands: IBand[], addedBand: IBand) => {
            const i = bands.findIndex(b => b._id === addedBand._id);
            if (i >= 0) {
                bands[i] = addedBand;
                return [...bands];
            } else {
                return [...bands, addedBand];
            }
        })
    );


    //combine the list of bands with the emitted id from changing the selected band in order to have the currently selected band
    private bandSelectedSubject = new Subject<IBand>();
    selectedBand$ = this.bandSelectedSubject.asObservable()
    .pipe(
        shareReplay(1)
    );

    selectBand(band: IBand): void {
        this.bandSelectedSubject.next(band);
    }

    addBand(band: IBand, switchContext: boolean): void {
        this.webRequestService.post<IBand>("bands", band).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).subscribe(addedBand => {
            this.bandToAdd$.next(addedBand);
            if (switchContext) {
                this.selectBand(addedBand);
            } 
        });
    }

    editBand(band: IBand): void {
        this.webRequestService.put<IBand>(`bands/${band._id}`, band).pipe(
            catchError(err => { 
                console.log(err);
                return EMPTY;
            })
        ).subscribe(addedBand => {
            this.bandToAdd$.next(addedBand);
            this.selectBand(addedBand); //make sure this band is selected
        });
    }
}