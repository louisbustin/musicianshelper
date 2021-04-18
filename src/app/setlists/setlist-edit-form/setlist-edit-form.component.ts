import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISetlist } from 'src/app/models/setlist.model';

@Component({
  selector: 'app-setlist-edit-form',
  templateUrl: './setlist-edit-form.component.html',
  styleUrls: ['./setlist-edit-form.component.scss']
})
export class SetlistEditFormComponent {

  @Input()
  setlist: ISetlist;

  @Output()
  cancelEvent = new EventEmitter<string>();

  @Output()
  submitEvent = new EventEmitter<ISetlist>();

  cancelClick(): void {
    this.cancelEvent.emit("cancelled");
  }

  submitClick(): void {
    this.submitEvent.emit(this.setlist);
  }

}
