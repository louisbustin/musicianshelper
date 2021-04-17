import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBand } from 'src/app/models/band.model';

@Component({
  selector: 'app-band-edit-form',
  templateUrl: './band-edit-form.component.html',
  styleUrls: ['./band-edit-form.component.scss']
})
export class BandEditFormComponent implements OnInit {
  @Input("band")
  band: IBand;

  @Output()
  cancelEvent = new EventEmitter<string>();

  @Output()
  submitEvent = new EventEmitter<IBand>();
  constructor() { }

  ngOnInit(): void {
  }

  cancelClick() {
    this.cancelEvent.emit("cancelled");
  }

  submitClick() {
    this.submitEvent.emit(this.band);
  }

}
