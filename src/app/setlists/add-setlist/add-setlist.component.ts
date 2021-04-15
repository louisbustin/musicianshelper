import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BandService } from 'src/app/band/band.service';
import { IBand } from 'src/app/models/band.model';
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
    name: "",
    band: null
  }

  currentBand: IBand;
  sub: Subscription;
  
  constructor(
    private router: Router, 
    private setlistService: SetlistService,
    private bandService: BandService
  ) { }

  ngOnInit(): void {
    this.sub = this.bandService.selectedBand$.subscribe(b => this.currentBand = b);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  addSetlist(setlist: ISetlist): void {
    this.setlist.band = this.currentBand._id;
    this.setlistService.addSetlist(setlist);
    
  }

  cancel(): void {
    this.router.navigate(["/home"]);
  }

}
