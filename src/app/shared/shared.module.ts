import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { ButtonCellRendererComponent } from './button-cell-renderer/button-cell-renderer.component';

@NgModule({
  declarations: [
    ButtonCellRendererComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    AuthModule,
    HttpClientModule,
    CommonModule,
    ButtonCellRendererComponent
  ]
})
export class SharedModule { }
