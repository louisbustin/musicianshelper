/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, Subject, merge, BehaviorSubject, Observable } from 'rxjs';
import { map, scan, shareReplay, take } from 'rxjs/operators';
import _ from 'lodash'

@Component({
  selector: 'app-list-picker',
  templateUrl: './list-picker.component.html',
  styleUrls: ['./list-picker.component.scss']
})
export class ListPickerComponent {


  @Input()
  completeListHeader: string;

  @Input()
  pickedListHeader: string;

  @Input()
  saveButtonText: string;

  @Output()
  saveClickEvent= new EventEmitter<any[]>();

  private _pickedListSubject$ = new BehaviorSubject<unknown[]>([]);
  private _completeListSubject$ = new BehaviorSubject<unknown[]>([]);

  pickedList$ = this._pickedListSubject$.asObservable();
  completeList$ = this._completeListSubject$.asObservable();
  
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

  pickedListWithAddAndRemove$: Observable<unknown[]> = merge(
    this.pickedList$,
    this.pickedListAdd$
  ).pipe(
    scan((pickList: any[], toAddRemove: any) => {      
      if (Array.isArray(toAddRemove)) {
        return [...toAddRemove];
      } else {
        if (toAddRemove) {
          const index = pickList.findIndex(l => l._id === toAddRemove._id);
          if (index >= 0 && toAddRemove.remove) {
            pickList.splice(index, 1);
            //loop through and update everyone else's order
            pickList.forEach((item, i) => { item.order = i; })
          }
          if (index < 0 && !toAddRemove.remove) {
            toAddRemove.order = pickList.length;
            pickList = [...pickList, toAddRemove];
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
          pickList[index].order = index - 1;
          pickList[index - 1].order = index;  
        }
        pickList.sort((a, b) => a.order - b.order)
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
        if (index < pickList.length - 1) {
          pickList[index].order = index + 1;
          pickList[index + 1].order = index;
        }
        pickList.sort((a, b) => a.order - b.order)
      }
      return [...pickList];
    }),
    shareReplay(1)

  )

  completeListWithoutPickedItems$ = combineLatest([
    this.completeList$, 
    this.pickedListWithAddAndRemove$
  ]).pipe(
    map(([compList, pickList]) => {
      return compList.filter(s => pickList.findIndex(setlistSong => _.isEqual(s, setlistSong))<0) 
    })
  )

  pickItem(item: any): void {
    item.remove = false;
    this.pickedListAddSubject$.next(item);
  }

  unpickItem(item: any): void {
    item.remove = true;
    this.pickedListAddSubject$.next(item);
  }

  moveItemUp(item: unknown): void {
    this.pickedListMoveUpSubject$.next(item);
  }

  moveItemDown(item: unknown): void {
    this.pickedListMoveDownSubject$.next(item);
  }

  save(): void {
    this.pickedListWithAddRemoveMoveUpAndDown$
      .pipe(take(1))
      .subscribe(x => this.saveClickEvent.emit(x));
  }

}
