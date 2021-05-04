import { NgModule } from '@angular/core';
import { ProfileBasicComponent } from './profile-basic/profile-basic.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProfileMusicComponent } from './profile-music/profile-music.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';

@NgModule({
  declarations: [
    ProfileBasicComponent,
    ProfileMusicComponent,
    ProfileComponent,
    ProfileImageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent,
      children:  [
        { path: 'basic', component: ProfileBasicComponent },
        { path: 'music', component: ProfileMusicComponent },
      ]},
      { path: '', redirectTo: 'profile/basic'},
    ]),
  ],
  exports: [
    ProfileImageComponent
  ]
})
export class UsersModule { }
