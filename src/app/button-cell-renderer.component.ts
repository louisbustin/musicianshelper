import { Component, OnDestroy } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid-community";

@Component({
  selector: "btn-cell-renderer",
  template: `<div style="{{params.containerStyle}}">
    <button (click)="btnClickedHandler()" class="{{params.buttonClass}}">{{params.buttonText}}</button>
    </div>
  `
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp, OnDestroy {

  public params: any;

  constructor() {}

  refresh(params: ICellRendererParams): boolean {
      //throw new Error("Method not implemented.");
      return true;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
      //throw new Error("Method not implemented.");
  }

  agInit(params: any): void {
        this.params = params;
  }

  btnClickedHandler() {
      //send the entire row to the function for clicked
    this.params.clicked(this.params.data);
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
