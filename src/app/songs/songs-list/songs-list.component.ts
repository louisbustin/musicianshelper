import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BandService } from 'src/app/band/band.service';
import { ISong } from 'src/app/models/song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent {

  private searchTermSubject$ = new BehaviorSubject("");
  searchTerm$ = this.searchTermSubject$.asObservable();
  songs$: Observable<ISong[]> = this.searchTerm$.pipe(
    mergeMap(searchTerm => this.songService.songs$.pipe(
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
    private songService: SongsService,
    private bandService: BandService
    ) { }

  searchTermChanged(searchText: string): void {
    this.searchTermSubject$.next(searchText);
  }
}
