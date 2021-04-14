import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SetlistListComponent } from './setlist-list/setlist-list.component';
import { SetlistEditFormComponent } from './setlist-edit-form/setlist-edit-form.component';
import { AddSetlistComponent } from './add-setlist/add-setlist.component';



@NgModule({
  declarations: [SetlistListComponent, SetlistEditFormComponent, AddSetlistComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'list', component: SetlistListComponent },
      { path: 'add', component: AddSetlistComponent }
    ])
  ]
})
export class SetlistsModule { }
