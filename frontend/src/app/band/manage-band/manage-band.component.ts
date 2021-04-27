import { Component } from '@angular/core';
import { BandService } from '../band.service';

@Component({
  selector: 'app-manage-band',
  templateUrl: './manage-band.component.html',
  styleUrls: ['./manage-band.component.scss']
})
export class ManageBandComponent {

  selectedBand$ = this.bandService.selectedBand$;

  constructor(private bandService: BandService) { }
}
