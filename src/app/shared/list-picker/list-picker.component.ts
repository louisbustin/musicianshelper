import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IListPickerItem } from './list-picker-item.model';

@Component({
  selector: 'app-list-picker',
  templateUrl: './list-picker.component.html',
  styleUrls: ['./list-picker.component.scss']
})
export class ListPickerComponent {

  @Input()
  pickedList$: Observable<IListPickerItem>;

  @Input()
  completeList$: Observable<IListPickerItem>;

}
