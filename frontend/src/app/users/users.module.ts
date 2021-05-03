import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'profile'},
    ]),
  ],
})
export class UsersModule { }
