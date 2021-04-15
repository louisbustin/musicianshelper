import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BandService } from 'src/app/band/band.service';
import { IBand } from 'src/app/models/band.model';
import { ISetlist } from 'src/app/models/setlist.model';
import { SetlistService } from '../setlist.service';

@Component({
  selector: 'app-setlist-list',
  templateUrl: './setlist-list.component.html',
  styleUrls: ['./setlist-list.component.scss']
})
export class SetlistListComponent implements OnInit, OnDestroy {

  setlists$: Observable<ISetlist[]>;
  sub: Subscription;

  selectedBand: IBand;

  constructor(private setlistService: SetlistService, private bandService: BandService) { }

  ngOnInit(): void {
    this.sub = this.bandService.selectedBand$.subscribe(b => { 
      this.selectedBand = b;
      this.setlists$ = this.setlistService.getSetlistsByBandId(b._id);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
