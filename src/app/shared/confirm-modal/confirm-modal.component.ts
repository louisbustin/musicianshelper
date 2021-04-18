import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  @Input()
  modalActive = false;

  @Input()
  title: string;

  @Input()
  message: string;

  @Input()
  okButtonText = "Ok";
  
  @Input()
  okButtonStyle = "";

  @Input()
  okButtonIcon:string;

  @Input()
  cancelButtonText = "Cancel";

  @Input()
  cancelButtonStyle = "";

  @Input()
  cancelButtonIcon: string;

  @Output()
  confirmEvent = new EventEmitter();

  @Output()
  cancelEvent = new EventEmitter();

  okButtonClicked(): void {
    this.confirmEvent.emit();
    this.modalActive = false;
  }

  cancelClicked(): void {
    this.cancelEvent.emit();
    this.modalActive = false;
  }

}
