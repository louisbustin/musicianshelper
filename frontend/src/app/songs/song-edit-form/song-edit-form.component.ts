import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ISong } from 'src/app/models/song.model';

@Component({
  selector: 'app-song-edit-form',
  templateUrl: './song-edit-form.component.html',
  styleUrls: ['./song-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongEditFormComponent {

  @Input()
  song: ISong;

  @Input()
  showDeleteButton: boolean;

  @Output()
  cancelEvent = new EventEmitter();

  @Output()
  submitEvent = new EventEmitter<ISong>();

  @Output()
  deleteEvent = new EventEmitter<ISong>();

  modalActive = false;

  cancelClick(): void {
    this.cancelEvent.emit();
  }

  submitClick(): void {
    this.submitEvent.emit(this.song);
  }

  modalCancel(): void {
    this.modalActive = false;
  }

  modalConfirm(): void {
    this.deleteEvent.emit(this.song);
    this.modalActive = false;
  }

}
