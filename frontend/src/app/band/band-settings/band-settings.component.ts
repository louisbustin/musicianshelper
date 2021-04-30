import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IBand } from 'src/app/models/band.model';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { BandService } from '../band.service';

@Component({
  selector: 'app-band-settings',
  templateUrl: './band-settings.component.html',
  styleUrls: ['./band-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandSettingsComponent implements OnDestroy {

  @ViewChild('notificationBox') 
  notify: NotificationComponent;

  bandSubscription =  this.bandService.selectedBand$.subscribe(
    b => this.band = Object.assign({}, b)
  )
  band: IBand;

  constructor(private bandService: BandService, private router: Router) { }
  ngOnDestroy(): void {
    this.bandSubscription.unsubscribe();
  }

  editBand(band: IBand): void {
    this.bandService.editBand(band);
    this.notify.open();    
  }

  cancel(): void {
    this.router.navigateByUrl("/band/manage");
  }

}
