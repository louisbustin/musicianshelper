import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
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
  
  zips$ = this.zipService.zips$.pipe(
    tap(x => console.log(x))
    );

  constructor(
    private zipService: ZipService
  ) { }

  onChange(zip: string): void {
    this.zipService.zipChanged(zip);
  }

  selectZip(zip: IZip): void {
    this.zipSelected = true;
    
  }
}
