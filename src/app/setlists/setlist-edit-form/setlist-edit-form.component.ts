import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISetlist } from 'src/app/models/setlist.model';

@Component({
  selector: 'app-setlist-edit-form',
  templateUrl: './setlist-edit-form.component.html',
  styleUrls: ['./setlist-edit-form.component.scss']
})
export class SetlistEditFormComponent implements OnInit {

  @Input()
  setlist: ISetlist;

  @Output()
  cancelEvent = new EventEmitter<string>();

  @Output()
  submitEvent = new EventEmitter<ISetlist>();
  constructor() { }

  ngOnInit(): void {
  }

  cancelClick() {
    this.cancelEvent.emit("cancelled");
  }

  submitClick() {
    this.submitEvent.emit(this.setlist);
  }


}
