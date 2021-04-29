import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import { ISetlist } from '../models/setlist.model';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { SetlistService } from '../setlist.service';
import { SongsService } from 'src/app/songs/songs.service';
import { ISetlistWithSongs } from '../models/setlist-with-songs.model';
import { IOrderedSong } from '../models/ordered-song.model';

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
    map(list => {
      if (list.songs) {
        return list.songs;
      }
      return [];
    }),
    shareReplay(1)
  );

  allSongs$ = this.songService.serverSongsByBand$.pipe(
    shareReplay(1));

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


  saveSetlistSongs(songs: IOrderedSong[], setlist: ISetlistWithSongs): void {
    setlist.songs = songs;
    this.setlistService.saveSetlistWithSongs(setlist);
    this.notify.open();
  }
}
