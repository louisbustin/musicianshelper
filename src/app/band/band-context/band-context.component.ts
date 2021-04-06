import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { IBand } from '../../models/band'

@Component({
  selector: 'app-band-context',
  templateUrl: './band-context.component.html',
  styleUrls: ['./band-context.component.scss']
})
export class BandContextComponent {

  currentBand$: Observable<IBand>;

  constructor(public auth: AuthService) { }

  bandContextChanged(bandId) {
    console.log(bandId);
  }

}
