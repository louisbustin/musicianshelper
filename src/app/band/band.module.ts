import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BandContextComponent } from './band-context/band-context.component';
import { AddBandComponent } from './add-band/add-band.component';
import { AuthGuard } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    BandContextComponent,
    AddBandComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'add', component: AddBandComponent },
    ])
  ],
  exports: [
    BandContextComponent
  ]
})
export class BandModule { }
