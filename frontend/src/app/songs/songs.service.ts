import { Injectable } from '@angular/core';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { catchError, concatMap, scan, shareReplay, tap } from 'rxjs/operators';
import { BandService } from '../band/band.service';
import { ISong } from '../models/song.model';
import { WebRequestService } from '../shared/services/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  DELETEDTEXT = "THISSETSONGHASBEENDELETED";

  //list of songs from serverside by band
  serverSongsByBand$: Observable<ISong[]> = this.bandService.selectedBand$.pipe(
      concatMap(band => this.webRequestService.get<ISong[]>(`songs/byband/${band._id}`)),
      shareReplay(1)
  );

  private songToAdd$: Subject<ISong> = new Subject<ISong>();
  songToAddAction$: Observable<ISong> = this.songToAdd$.asObservable();

  private songToDelete$ = new Subject<ISong>();
  songToDeleteAction$ = this.songToDelete$.asObservable();

  songs$: Observable<ISong[]>  = merge(
      this.serverSongsByBand$,
      this.songToAddAction$,
      this.songToDelete$
  ).pipe(
      scan((songs: ISong[], song: ISong) => {
          if (Array.isArray(song)) {
              return song;
          } else {
              const i = songs.findIndex(b => b._id === song._id);
              if (i >= 0) {
                  if (song.name === this.DELETEDTEXT) {
                    songs.splice(i, 1);
                      return [...songs];
                  } else {
                    songs[i] = song;
                      return [...songs];
                  }
              } else {
                  return [...songs, song];
              }
          }
      }),
      shareReplay(1)
  );


  constructor(
      private webRequestService: WebRequestService,
      private bandService: BandService
      ) { }

  addSong(song: ISong): void {
      this.webRequestService.post<ISong>("songs", song).pipe(
          catchError(err => { 
              console.log(err);
              return EMPTY;
          })
      ).pipe(
          tap(s => console.log(s))
      ).subscribe(addedSong => {
          this.songToAdd$.next(addedSong);
      });
  }

  editSong(song: ISong):void  {
      this.webRequestService.put(`songs/${song._id}`, song).pipe(
          catchError(err => { 
              console.log(err);
              return EMPTY;
          })
      ).subscribe(changedSong => {
          this.songToAdd$.next(changedSong);
      });
  }

  getSong(songId: string): Observable<ISong> {
      return this.webRequestService.get<ISong>(`songs/${songId}`);
  }

  deleteSong(songId: string): void {
      this.webRequestService.delete<ISong>(`songs/${songId}`).pipe(
          catchError(err => {
              console.log(err);
              return EMPTY;
          })
      ).subscribe((deletedSong) => {
        deletedSong.name = this.DELETEDTEXT;
          this.songToDelete$.next(deletedSong);
      });
  }
}