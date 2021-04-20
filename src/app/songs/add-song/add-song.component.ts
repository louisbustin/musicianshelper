import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BandService } from 'src/app/band/band.service';
import { IBand } from 'src/app/models/band.model';
import { ISong } from 'src/app/models/song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit, OnDestroy {

  song: ISong = {
    _id: null,
    name: "",
    artist: "",
    lyrics: "",
    notes: "",
    band: ""
  }

  currentBand: IBand;
  sub: Subscription;

  constructor(
    private router: Router,
    private songService: SongsService,
    private bandService: BandService
  ) { }

  ngOnInit(): void {
    this.sub = this.bandService.selectedBand$.subscribe(b => this.currentBand = b);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  cancel(): void {
    this.router.navigateByUrl("/songs");
  }
  
  addSong(song: ISong): void {
    this.song.band = this.currentBand._id;
    this.songService.addSong(song);
    this.router.navigateByUrl("/songs");
  }

}
