import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBand } from 'src/app/models/band.model';
import { BandService } from '../band.service';

@Component({
  selector: 'app-add-band',
  templateUrl: './add-band.component.html',
  styleUrls: ['./add-band.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBandComponent {

  band: IBand = {
    _id: null,
    name: "",
    email: ""
  };

  constructor(private router: Router, private bandService: BandService) { }

  addBand(band: IBand): void {
    //here we will call the server to actually add this to the db
    //the band service will add it to db, then add it to the bands possible for context
    this.bandService.addBand(band, true);
    this.router.navigate(['/band/manage']);
  }

  cancel(): void {
    this.router.navigate(["/home"]);
  }

}
