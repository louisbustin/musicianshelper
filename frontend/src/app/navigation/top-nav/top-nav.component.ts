import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BandService } from 'src/app/band/band.service';

@Component({
  selector: 'navigation-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent {
  navToggle = false;

  currentBand$ = this.bandService.selectedBand$;

  constructor(
    private bandService: BandService
  ) { }

}
