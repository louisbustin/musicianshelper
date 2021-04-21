import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { ButtonCellRendererComponent } from './button-cell-renderer/button-cell-renderer.component';
import { NotificationComponent } from './notification/notification.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ListPickerComponent } from './list-picker/list-picker.component';

@NgModule({
  declarations: [
    ButtonCellRendererComponent,
    NotificationComponent,
    ConfirmModalComponent,
    ListPickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    AuthModule,
    HttpClientModule,
    CommonModule,
    ButtonCellRendererComponent,
    NotificationComponent,
    ConfirmModalComponent,
    ListPickerComponent
  ]
})
export class SharedModule { }
