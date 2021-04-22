/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { combineLatest, Observable, Subject, merge, pipe } from 'rxjs';
import { map, scan } from 'rxjs/operators';

//this component assumes the items sent for observables have both an _id and name field
@Component({
  selector: 'app-list-picker',
  templateUrl: './list-picker.component.html',
  styleUrls: ['./list-picker.component.scss']
})
export class ListPickerComponent {

  @Input()
  pickedList$: Observable<any> = new Observable();

  @Input()
  completeList$: Observable<any> = new Observable();

  private pickedListAddSubject$ = new Subject();
  pickedListAdd$ = this.pickedListAddSubject$.asObservable();

  pickedListWithAdd$ = merge(
    this.pickedList$,
    this.pickedListAdd$
  ).pipe(
    scan((pickList, toAdd) => {
      if (Array.isArray(toAdd)) {
        return [...toAdd];
      } else {
        return [...pickList, toAdd]
      }
    })
  )

  private pickedListRemoveSubject$ = new Subject();
  pickedListRemove$ = this.pickedListRemoveSubject$.asObservable();

  pickedListWithAddAndRemove$ = merge(
    this.pickedListWithAdd$,
    this.pickedListRemove$
  ).pipe(
    scan((pickList, toRemove) => {
      if (Array.isArray(toRemove)) {
        return [...toRemove];
      } else {
        const index = pickList.findIndex(l => l._id === toRemove._id);
        if (index >= 0) {
          pickList.splice(index, 1);
        }
        return [...pickList];
      }
    })
  );

  completeListWithoutPickedItems$ = combineLatest([
    this.completeList$, 
    this.pickedListWithAddAndRemove$
  ]).pipe(
    map((compList: any, pickList: any) => {
      return compList.filter(s => pickList.findIndex(setlistSong => s._id === setlistSong._id)<0) 
    })
  )

}
