import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISetlist } from 'src/app/models/setlist.model';
import { SetlistService } from '../setlist.service';

@Component({
  selector: 'app-add-setlist',
  templateUrl: './add-setlist.component.html',
  styleUrls: ['./add-setlist.component.scss']
})
export class AddSetlistComponent implements OnInit {

  setlist: ISetlist = {
    _id: null,
    name: ""
  }

  constructor(private router: Router, private setlistService: SetlistService) { }

  ngOnInit(): void {
  }
  
  addSetlist(setlist: ISetlist): void {
    //here we will call the server to actually add this to the db
    //the band service will add it to db, then add it to the bands possible for context
    //this.bandService.addBand(band, true);
    //this.router.navigate(['/band/manage']);
    this.setlistService.addSetlist(setlist);
    
  }

  cancel(): void {
    this.router.navigate(["/home"]);
  }

}
