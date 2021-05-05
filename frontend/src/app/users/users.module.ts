import { NgModule } from '@angular/core';
import { ProfileBasicComponent } from './profile-basic/profile-basic.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProfileMusicComponent } from './profile-music/profile-music.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';

@NgModule({
  declarations: [
    ProfileBasicComponent,
    ProfileMusicComponent,
    ProfileComponent,
    ProfileSearchComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent,
      children:  [
        { path: 'basic', component: ProfileBasicComponent },
        { path: 'music', component: ProfileMusicComponent },
      ]},
      { path: 'search', component: ProfileSearchComponent },
    ]),
  ],
  exports: [
  ]
})
export class UsersModule { }
