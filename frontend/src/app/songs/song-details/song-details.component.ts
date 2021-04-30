import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ISong } from 'src/app/models/song.model';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongDetailsComponent {

  @ViewChild('notificationBox') 
  notify: NotificationComponent;

  songId$: Observable<string> = this.route.params.pipe(
    map(params => params['songId'])
  );

  currentSong$: Observable<ISong> = this.songId$.pipe(
    mergeMap(x => this.songService.getSong(x))
  );

  constructor(
    private route: ActivatedRoute,
    private songService: SongsService,
    private router: Router
    ) {}
  
  cancel(): void {
    this.router.navigateByUrl("/songs");
  }
  
  editSong(setlist: ISong): void {
    this.songService.editSong(setlist);
    this.notify.open();
  }

  deleteSong(setlist: ISong): void {
    this.songService.deleteSong(setlist._id);
    this.router.navigateByUrl("/songs");
  }
}

