import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BandContextComponent } from './band-context/band-context.component';

@NgModule({
  declarations: [
    BandContextComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    BandContextComponent
  ]
})
export class BandModule { }
