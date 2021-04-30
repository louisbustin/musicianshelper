import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IBand } from 'src/app/models/band.model';

@Component({
  selector: 'app-band-edit-form',
  templateUrl: './band-edit-form.component.html',
  styleUrls: ['./band-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandEditFormComponent {
  @Input("band")
  band: IBand;

  @Output()
  cancelEvent = new EventEmitter<string>();

  @Output()
  submitEvent = new EventEmitter<IBand>();

  cancelClick(): void {
    this.cancelEvent.emit("cancelled");
  }

  submitClick(): void {
    this.submitEvent.emit(this.band);
  }

}
