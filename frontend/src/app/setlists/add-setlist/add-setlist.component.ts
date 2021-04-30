import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BandService } from 'src/app/band/band.service';
import { IBand } from 'src/app/models/band.model';
import { ISetlist } from '../models/setlist.model';
import { SetlistService } from '../setlist.service';

@Component({
  selector: 'app-add-setlist',
  templateUrl: './add-setlist.component.html',
  styleUrls: ['./add-setlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSetlistComponent implements OnInit {

  setlist: ISetlist = {
    _id: null,
    name: "",
    band: null,
    notes: ""
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
    //once it is added, navigate over to this edit page
    this.setlistService.setlistToAddAction$.pipe(take(1)).subscribe(addedList => {
      this.router.navigateByUrl(`/setlists/${addedList._id}`);
    });

    this.setlist.band = this.currentBand._id;
    this.setlistService.addSetlist(setlist);
  }

  cancel(): void {
    this.router.navigate(["/setlists"]);
  }

}
