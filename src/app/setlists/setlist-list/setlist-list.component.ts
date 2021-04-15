import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  setlists$: Observable<ISetlist[]> = this.setlistService.setlists$;

  selectedBand$ = this.bandService.selectedBand$.pipe(
    tap(b => {
      this.setlistService.getSetlistsByBandId(b._id);
    })

  )
  ;

  constructor(
    private setlistService: SetlistService, 
    private bandService: BandService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }


}
