/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { combineLatest, Subject, merge, BehaviorSubject, Observable } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import _ from 'lodash'

@Component({
  selector: 'app-list-picker',
  templateUrl: './list-picker.component.html',
  styleUrls: ['./list-picker.component.scss']
})
export class ListPickerComponent {


  private _pickedListSubject$ = new BehaviorSubject<unknown[]>([]);
  private _completeListSubject$ = new BehaviorSubject<unknown[]>([]);

  pickedList$ = this._pickedListSubject$.asObservable();
  completeList$ = this._completeListSubject$.asObservable().pipe(tap(x => console.log(x)));
  
  @Input()
  set pickedList(value: unknown[]) {
    this._pickedListSubject$.next(value);
  }
  get pickedList(): unknown[] {
    return this._pickedListSubject$.getValue();
  }

  @Input()
  set completeList(value: unknown[]) {
    this._completeListSubject$.next(value);
  }
  get completeList(): unknown[] {
    return this._completeListSubject$.getValue();
  }

  private pickedListAddSubject$ = new Subject();
  pickedListAdd$ = this.pickedListAddSubject$.asObservable();

  pickedListWithAdd$ = merge(
    this.pickedList$,
    this.pickedListAdd$
  ).pipe(
    scan((pickList: unknown[], toAdd: any) => {
      if (Array.isArray(toAdd)) {
        return [...toAdd];
      } else {
        if (toAdd) {
          toAdd.order = pickList.length;
          return [...pickList, toAdd]
        }
        return [...pickList];
      }
    })
  )

  private pickedListRemoveSubject$ = new Subject<unknown>();
  pickedListRemove$ = this.pickedListRemoveSubject$.asObservable();

  pickedListWithAddAndRemove$: Observable<unknown[]> = merge(
    this.pickedListWithAdd$,
    this.pickedListRemove$
  ).pipe(
    scan((pickList: any[], toRemove: any) => {
      if (Array.isArray(toRemove)) {
        return [...toRemove];
      } else {
        if (toRemove) {
          const index = pickList.findIndex(l => l._id === toRemove._id);
          if (index >= 0) {
            pickList.splice(index, 1);
          }
        }
        return [...pickList];
      }
    })
  );

  private pickedListMoveUpSubject$ = new Subject<unknown>();
  pickedListMoveUp$ = this.pickedListMoveUpSubject$.asObservable();
  pickedListWithAddRemoveAndMoveUp$: Observable<unknown[]> = merge(
    this.pickedListWithAddAndRemove$,
    this.pickedListMoveUp$
  ).pipe(
    scan((pickList: any[], toMoveUp: any) => {
      if (Array.isArray(toMoveUp)) {
        return [...toMoveUp];
      } else {
        pickList.sort((a, b) => a.order - b.order)
        const index = pickList.findIndex(l => l._id === toMoveUp._id);
        if (index > 0) {
          console.log(pickList);
          pickList[index].order = index - 1;
          pickList[index - 1].order = index;  
          console.log(pickList);                 
        }
      }
      return [...pickList];
    })
  )

  private pickedListMoveDownSubject$ = new Subject<unknown>();
  pickedListMoveDown$ = this.pickedListMoveDownSubject$.asObservable();
  pickedListWithAddRemoveMoveUpAndDown$: Observable<unknown[]> = merge(
    this.pickedListWithAddRemoveAndMoveUp$,
    this.pickedListMoveDown$
  ).pipe(
    scan((pickList: any[], toMoveDown: any) => {
      if (Array.isArray(toMoveDown)) {
        return [...toMoveDown];
      } else {
        pickList.sort((a, b) => a.order - b.order)
        const index = pickList.findIndex(l => l._id === toMoveDown._id);
        if (index < pickList.length) {
          pickList[index].order = index + 1;
          pickList[index + 1].order = index;          
        }
      }
      return [...pickList];
    })
  )

  completeListWithoutPickedItems$ = combineLatest([
    this.completeList$, 
    this.pickedListWithAddAndRemove$
  ]).pipe(
    map(([compList, pickList]) => {
      return compList.filter(s => pickList.findIndex(setlistSong => _.isEqual(s, setlistSong))<0) 
    })
  )

  pickItem(item: unknown): void {
    this.pickedListAddSubject$.next(item);
  }

  unpickItem(item: unknown): void {
    this.pickedListRemoveSubject$.next(item);
  }

  moveItemUp(item: unknown): void {
    this.pickedListMoveUpSubject$.next(item);
  }

  moveItemDown(item: unknown): void {
    this.pickedListMoveDownSubject$.next(item);
  }

}
