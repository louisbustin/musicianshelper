/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IZip } from 'src/app/models/zip.model';
import { ZipService } from '../services/zip.service';

@Component({
  selector: 'app-zip-dropdown',
  templateUrl: './zip-dropdown.component.html',
  styleUrls: ['./zip-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZipDropdownComponent {

  zipSelected = false;

  @Input()
  selectedZip = "";

  @Output()
  zipChanged = new EventEmitter<string>();
  
  zips$ = this.zipService.zips$;

  constructor(
    private zipService: ZipService
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange(zip: any): void {
    if (!this.zipSelected) {    
      //select the zip if the user types in five digits
      if (zip.length == 5 && !isNaN(zip)) {
        this.zipSelected = true;
        this.zipChanged.emit(zip);
      } else {
        this.zipService.zipChanged(zip);
      } 
    } else {
      this.zipSelected = false;
    }
  }

  selectZip(zip: IZip): void {
    this.zipSelected = true;
    this.selectedZip = zip.zip;
    this.zipChanged.emit(zip.zip);
  }
}
