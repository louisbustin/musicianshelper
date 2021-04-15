import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ISetlist } from 'src/app/models/setlist.model';
import { SetlistService } from '../setlist.service';

@Component({
  selector: 'app-setlist-details',
  templateUrl: './setlist-details.component.html',
  styleUrls: ['./setlist-details.component.scss']
})
export class SetlistDetailsComponent implements OnInit {

  setlistId$: Observable<string> = this.route.params.pipe(
    map(params => params['setlistId'])
  );

  currentSetlist$: Observable<ISetlist> = this.setlistId$.pipe(
    mergeMap(x => this.setlistService.getSetlist(x))
  );

  constructor(
    private route: ActivatedRoute,
    private setlistService: SetlistService,
    private router: Router
    ) {}

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }
  
  cancel() {
    this.router.navigateByUrl("/setlists");
  }
  
  editSetlist(setlist: ISetlist) {
    this.setlistService.editSetlist(setlist);
  }
}
