import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BandService } from '../band/band.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent {

  currentBand$ = this.bandService.selectedBand$;

  constructor(private bandService: BandService) { }

}
