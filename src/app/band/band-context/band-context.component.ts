import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IBand } from 'src/app/models/band.model';
import { BandService } from '../band.service';

@Component({
    selector: 'app-band-context',
    templateUrl: './band-context.component.html',
    styleUrls: ['./band-context.component.scss']
})
export class BandContextComponent implements OnInit, OnDestroy {

    bands$ = this.bandService.bands$.pipe(
        tap(bands => {
            //swap to the first band in the list IF the selected band is not yet set
            if (!this.selectedBand && bands.length > 0) {
                this.bandService.selectBand(bands[0]);
            }
        })
    );
    
    private bandSub: Subscription;
    selectedBand: IBand;

    constructor(public auth: AuthService, private bandService: BandService) { }

    ngOnDestroy(): void {
        this.bandSub.unsubscribe();
    }

    ngOnInit(): void {
        this.bandSub = this.bandService.selectedBand$.subscribe(b => this.selectedBand = b);
    }

    bandContextChanged() {
        this.bandService.selectBand(this.selectedBand);
    }

}
