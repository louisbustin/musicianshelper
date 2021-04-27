/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, Subject, merge, BehaviorSubject, Observable } from 'rxjs';
import { map, scan, shareReplay, take } from 'rxjs/operators';

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

  @Input()
  displayProperty: string;

  @Input()
  orderProperty = 'order';

  @Input()
  completeListIdProperty = '_id';

  @Input()
  pickedListIdProperty = 'song._id';

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
          let propText = this.completeListIdProperty;
          if (toAddRemove.remove) {
            propText = this.pickedListIdProperty;
          }
          const index = pickList.findIndex(l => this.getId(l, this.pickedListIdProperty) === this.getId(toAddRemove, propText));
          if (index >= 0 && toAddRemove.remove) {
            pickList.splice(index, 1);
            //loop through and update everyone else's order
            pickList.forEach((item, i) => { item[this.orderProperty] = i; })
          }
          if (index < 0 && !toAddRemove.remove) {
            const toAdd = {};
            toAdd[this.orderProperty] = pickList.length;
            toAdd[this.getSubItemText(this.pickedListIdProperty)] = toAddRemove;
            pickList = [...pickList, toAdd];
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
        pickList.sort((a, b) => a[this.orderProperty] - b[this.orderProperty])
        const index = pickList.findIndex(l => this.getId(l, this.pickedListIdProperty) === this.getId(toMoveUp, this.pickedListIdProperty));
        if (index > 0) {
          pickList[index][this.orderProperty] = index - 1;
          pickList[index - 1][this.orderProperty] = index;  
        }
        pickList.sort((a, b) => a[this.orderProperty] - b[this.orderProperty])
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
        pickList.sort((a, b) => a[this.orderProperty] - b[this.orderProperty])
        const index = pickList.findIndex(l => this.getId(l, this.pickedListIdProperty) === this.getId(toMoveDown, this.pickedListIdProperty)
        );
        if (index < pickList.length - 1) {
          pickList[index][this.orderProperty] = index + 1;
          pickList[index + 1][this.orderProperty] = index;
        }
        pickList.sort((a, b) => a[this.orderProperty] - b[this.orderProperty])
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
      return compList.filter(s => pickList.findIndex(setlistSong => this.getId(s, this.completeListIdProperty) === this.getId(setlistSong, this.pickedListIdProperty))<0) 
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

  getDisplayText(item: unknown): string {
    const properties = this.displayProperty.split('.');
    let text = item;
    for (let i=0; i < properties.length; i++) {
      text = text[properties[i]];
    }
    return typeof text === 'string' ? text : undefined;
  }

  getId(item: unknown, idProperty: string) {
    const properties = idProperty.split('.');
    let text = item;
    for (let i=0; i < properties.length; i++) {
      text = text[properties[i]];
    }
    return typeof text === 'string' ? text : undefined;    
  }

  getSubItemText(idProperty: string): string {
    const properties = idProperty.split('.');
    if (properties.length > 1) {
      return properties[0];
    }
    return "";
  }
}
