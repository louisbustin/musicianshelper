import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ISong } from '../models/song.model';
import { WebRequestService } from '../shared/services/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  songs$: Observable<ISong[]> = this.webRequestService.get<ISong[]>('songs').pipe(
    shareReplay(1)
  );
  
  constructor(private webRequestService: WebRequestService) { }
}