import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BandService } from 'src/app/band/band.service';

@Component({
  selector: 'navigation-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftNavComponent {

  currentBand$ = this.bandService.selectedBand$;

  constructor(private bandService: BandService) { }

}
