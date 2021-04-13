import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBand } from 'src/app/models/band.model';
import { BandService } from '../band.service';

@Component({
  selector: 'app-add-band',
  templateUrl: './add-band.component.html',
  styleUrls: ['./add-band.component.scss']
})
export class AddBandComponent implements OnInit {

  band: IBand = {
    _id: null,
    name: "",
    email: ""
  };

  constructor(private router: Router, private bandService: BandService) { }

  ngOnInit(): void {
  }

  addBand(): void {
    //here we will call the server to actually add this to the db
    //the band service will add it to db, then add it to the bands possible for context
    this.band._id = Math.random().toString(36).substring(7)
    this.bandService.addBand(this.band, true);
    this.router.navigate(['/band/manage']);
  }

  cancelAdd(): void {
    this.router.navigate(["/home"]);
  }

}
