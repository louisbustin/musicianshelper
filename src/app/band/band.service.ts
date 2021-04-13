import { Injectable } from "@angular/core";
import { Subject, Observable, combineLatest, merge } from "rxjs";
import { map, scan, shareReplay, tap } from "rxjs/operators";
import { IBand } from '../models/band.model'
import { WebRequestService } from "../shared/services/web-request.service";

@Injectable({
    providedIn: 'root'
  })
export class BandService {
   
    readonly BASE_PATH: string = 'bands';

    constructor(private webRequestService: WebRequestService) { }
    
    //list of bands from serverside. using "sharedReplay" to cache these locally
    serverBands$: Observable<IBand[]> = this.webRequestService.getTyped<IBand[]>(this.BASE_PATH)
    .pipe(
        tap(x => console.log(x)),
        shareReplay(1)
    );

    //combine with a subject for a band to allow us to add a new band once it's added serverside
    private bandToAdd$ = new Subject<IBand>();
    bandToAddAction$ = this.bandToAdd$.asObservable();
    bands$: Observable<IBand[]> = merge(
        this.serverBands$,
        this.bandToAddAction$
    ).pipe(
        scan((bands: IBand[], addedBand: IBand) => [...bands, addedBand])
    );


    //combine the list of bands with the emitted id from changing the selected band in order to have the currently selected band
    private bandSelectedSubject = new Subject<string>();
    bandSelectedAction$ = this.bandSelectedSubject.asObservable();
    selectedBand$: Observable<IBand> = combineLatest([this.bands$, this.bandSelectedAction$])
    .pipe(
        map(([bands, selectedBandId]) => bands.find(band => band._id === selectedBandId)),
        tap(band => console.log(`Selected band changed to: ${band._id}`)),
        shareReplay(1)
    );

    selectBand(id: string) {
        this.bandSelectedSubject.next(id);
    }

    addBand(band: IBand, switchContext: boolean) {
        this.bandToAdd$.next(band);
        if (switchContext) {
            this.selectBand(band._id);
        }
    }

}