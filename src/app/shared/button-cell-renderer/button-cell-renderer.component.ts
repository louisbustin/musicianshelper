/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "btn-cell-renderer",
  template: `<div style="{{params.containerStyle}}">
    <button (click)="btnClickedHandler()" class="{{params.buttonClass}}">{{params.buttonText}}</button>
    </div>
  `
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {

  public params: any;

  refresh(): boolean {
      //throw new Error("Method not implemented.");
      return true;
  }
  afterGuiAttached?(): void {
      //throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  agInit(params: any): void {
        this.params = params;
  }

  btnClickedHandler(): void {
      //send the entire row to the function for clicked
    this.params.clicked(this.params.data);
  }

}
