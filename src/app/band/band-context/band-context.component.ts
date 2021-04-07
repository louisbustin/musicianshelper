import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { interval } from 'rxjs';
import { skipUntil, take, tap } from 'rxjs/operators';
import { BandService } from '../band.service';

@Component({
    selector: 'app-band-context',
    templateUrl: './band-context.component.html',
    styleUrls: ['./band-context.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandContextComponent {

    bands$ = this.bandService.bands$
    .pipe(
        tap(bands => {
            this.bandService.selectBand(bands[0]._id);
        })
    );

    constructor(public auth: AuthService, private bandService: BandService) { }

    bandContextChanged(bandId: string) {
        this.bandService.selectBand(bandId);
    }

}
