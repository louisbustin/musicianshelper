import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BandContextComponent } from './band-context/band-context.component';
import { AddBandComponent } from './add-band/add-band.component';
import { BandMembersComponent } from './band-members/band-members.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ManageBandComponent } from './manage-band/manage-band.component';

@NgModule({
  declarations: [
    BandContextComponent,
    AddBandComponent,
    BandMembersComponent,
    ManageBandComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: 'band', 
        canActivate: [AuthGuard],
        children: [
          { path: 'add', component: AddBandComponent },
          { path: 'members', component: BandMembersComponent },
          { path: 'manage', component: ManageBandComponent },
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
