import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BandService } from 'src/app/band/band.service';
import { ISetlist } from 'src/app/models/setlist.model';
import { SetlistService } from '../setlist.service';

@Component({
  selector: 'app-setlist-list',
  templateUrl: './setlist-list.component.html',
  styleUrls: ['./setlist-list.component.scss']
})
export class SetlistListComponent {

  private searchTermSubject$ = new BehaviorSubject("");
  searchTerm$ = this.searchTermSubject$.asObservable();
  setlists$: Observable<ISetlist[]> = this.searchTerm$.pipe(
    mergeMap(searchTerm => this.setlistService.setlists$.pipe(
      map(lists =>  {
        if (searchTerm === "") {
          return lists;
        } else {
          return lists.filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }
      })
    ))
  );


  selectedBand$ = this.bandService.selectedBand$;

  constructor(
    private setlistService: SetlistService, 
    private bandService: BandService,
    private router: Router
    ) { }

  searchTermChanged(searchText: string) {
    this.searchTermSubject$.next(searchText);
  }
}
