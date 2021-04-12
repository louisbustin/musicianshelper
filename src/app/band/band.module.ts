import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BandContextComponent } from './band-context/band-context.component';
import { AddBandComponent } from './add-band/add-band.component';
import { BandMembersComponent } from './band-members/band-members.component';
import { AuthGuard } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    BandContextComponent,
    AddBandComponent,
    BandMembersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: 'band', 
        children: [
          { path: 'add', component: AddBandComponent },
          { path: 'members', component: BandMembersComponent },
          { path: '', redirectTo: 'add', pathMatch: 'full' }
        ]
      }      
    ])
  ],
  exports: [
    BandContextComponent
  ]
})
export class BandModule { }
