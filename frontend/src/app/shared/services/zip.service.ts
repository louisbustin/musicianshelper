import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IZip } from 'src/app/models/zip.model';
import { WebRequestService } from './web-request.service';

@Injectable({
    providedIn: 'root'
})
export class ZipService {
    private typedZipSubject$ = new BehaviorSubject('366');
    typedZip$ = this.typedZipSubject$.asObservable();

    zips$ = this.typedZip$.pipe(
        switchMap(zip => {
            if (zip.length > 1 && zip.length < 6) {
                return this.webRequestService.get<IZip>(`zips/search/${zip}`)
            }
            return EMPTY;
        })
    )

    constructor (
        private webRequestService: WebRequestService
    ) { }

    zipChanged(key): void {
        this.typedZipSubject$.next(key);
    }

}
