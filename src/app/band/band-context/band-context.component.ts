import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BandService } from '../band.service';

@Component({
    selector: 'app-band-context',
    templateUrl: './band-context.component.html',
    styleUrls: ['./band-context.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandContextComponent implements OnInit {

    bands$ = this.bandService.bands$;
    
    constructor(public auth: AuthService, private bandService: BandService) { }
    ngOnInit(): void {
        //issue a selection for the one selected by default
        
    }

    bandContextChanged(bandId: string) {
        this.bandService.selectBand(bandId);
    }

    

}
