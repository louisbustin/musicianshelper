import { Component, OnInit } from '@angular/core';
import { BandService } from 'src/app/band/band.service';

@Component({
  selector: 'navigation-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  currentBand$ = this.bandService.selectedBand$;

  constructor(private bandService: BandService) { }

  ngOnInit(): void {
  }

}
