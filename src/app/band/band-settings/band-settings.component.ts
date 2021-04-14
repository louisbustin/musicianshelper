import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IBand } from 'src/app/models/band.model';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { BandService } from '../band.service';

@Component({
  selector: 'app-band-settings',
  templateUrl: './band-settings.component.html',
  styleUrls: ['./band-settings.component.scss']
})
export class BandSettingsComponent implements OnInit, OnDestroy {

  displayMessage: string;

  @ViewChild('notificationBox') 
  notify: NotificationComponent;

  bandSubscription =  this.bandService.selectedBand$.subscribe(
    b => this.band = b
  )
  band: IBand;

  constructor(private bandService: BandService, private router: Router) { }
  ngOnDestroy(): void {
    this.bandSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  editBand(band: IBand) {
    this.bandService.editBand(band);
    this.displayMessage = "Edited band " + band.name;
    this.notify.open();    
  }

  cancel() {
    this.router.navigateByUrl("/band/manage");
  }

}
