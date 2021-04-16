import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SetlistListComponent } from './setlist-list/setlist-list.component';
import { SetlistEditFormComponent } from './setlist-edit-form/setlist-edit-form.component';
import { AddSetlistComponent } from './add-setlist/add-setlist.component';
import { SetlistDetailsComponent } from './setlist-details/setlist-details.component';

@NgModule({
  declarations: [SetlistListComponent, SetlistEditFormComponent, AddSetlistComponent, SetlistDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: SetlistListComponent,
        children: [
          { path: 'add', component: AddSetlistComponent },
          { path: ':setlistId', component: SetlistDetailsComponent}
        ]
      }
    ])
  ]
})
export class SetlistsModule { }
