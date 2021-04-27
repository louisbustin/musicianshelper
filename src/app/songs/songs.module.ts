import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SongEditFormComponent } from './song-edit-form/song-edit-form.component';
import { SongDetailsComponent } from './song-details/song-details.component';
import { AddSongComponent } from './add-song/add-song.component';



@NgModule({
  declarations: [SongsListComponent, SongEditFormComponent, SongDetailsComponent, AddSongComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: SongsListComponent,
        children: [
          { path: 'add', component: AddSongComponent },
          { path: ':songId', component: SongDetailsComponent }
        ]
      }
    ])
  ]
})
export class SongsModule { }
