import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, Subject, merge } from 'rxjs';
import { map, mergeMap, scan, shareReplay } from 'rxjs/operators';
import { ISetlist } from '../models/setlist.model';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { SetlistService } from '../setlist.service';
import { SongsService } from 'src/app/songs/songs.service';
import { ISetlistWithSongs } from '../models/setlist-with-songs.model';
import { ISong } from 'src/app/models/song.model';

@Component({
  selector: 'app-setlist-details',
  templateUrl: './setlist-details.component.html',
  styleUrls: ['./setlist-details.component.scss']
})
export class SetlistDetailsComponent {

  showDetails: false;

  @ViewChild('notificationBox') 
  notify: NotificationComponent;

  setlistId$: Observable<string> = this.route.params.pipe(
    map(params => params['setlistId'])
  );

  currentSetlist$: Observable<ISetlistWithSongs> = this.setlistId$.pipe(
    mergeMap(x => this.setlistService.getSetlist(x)),
    shareReplay(1)
  );

  currentSetlistSongs$ = this.currentSetlist$.pipe(
    map(list => list.songs),
    shareReplay(1)
  );

  private addSongToSetlistSubject$ = new Subject<ISong>();
  addSongToSetlist$ = this.addSongToSetlistSubject$.asObservable();

  currentSetlistSongsWithAdd$ = merge(
    this.currentSetlistSongs$,
    this.addSongToSetlist$
  ).pipe(
    scan((songs: ISong[], song: ISong) => {
      if (Array.isArray(song)) {
        return [...song];
      } else {
        return [...songs, song];
      }
    })
  )

  private removeSongFromSetlistSubject$ = new Subject<ISong>();
  removeSongFromSetlist$ = this.removeSongFromSetlistSubject$.asObservable();
  currentSetlistSongsWithAddAndRemove$ = merge(
    this.currentSetlistSongsWithAdd$,
    this.removeSongFromSetlist$
  ).pipe(
    scan((songs: ISong[], song: ISong) => {
      if (Array.isArray(song)) {
        return [...song];
      } else {
        const index = songs.findIndex(s => s._id === song._id);
        if (index >= 0) {
          songs.splice(index, 1);
        }
        return [...songs];
      }
    })
  )

  allSongs$ = this.songService.serverSongsByBand$.pipe(shareReplay(1));
  allSongsNotPicked$ = combineLatest([
    this.allSongs$,
    this.currentSetlistSongsWithAddAndRemove$
  ]).pipe(
    map(([allSongs, setlistSongs]) => {
      return allSongs.filter(s => setlistSongs.findIndex(setlistSong => s._id === setlistSong._id)<0)
    })
  );
  

  constructor(
    private route: ActivatedRoute,
    private setlistService: SetlistService,
    private router: Router,
    private songService: SongsService
    ) {}
  
  cancel(): void {
    this.router.navigateByUrl("/setlists");
  }
  
  editSetlist(setlist: ISetlist): void {
    this.setlistService.editSetlist(setlist);
    this.notify.open();
  }

  deleteSetlist(setlist: ISetlist): void {
    this.setlistService.deleteSetlist(setlist._id);
    this.router.navigateByUrl("/setlists");
  }

  addSongToSetlist(song: ISong): void {
    this.addSongToSetlistSubject$.next(song);
  }

  removeSongFromSetlist(song: ISong): void {
    this.removeSongFromSetlistSubject$.next(song);
  }

  saveSetlistSongs(setlist: ISetlistWithSongs, songs: ISong[]): void {
    setlist.songs = songs;
    this.setlistService.editSetlist(setlist);

  }
}
