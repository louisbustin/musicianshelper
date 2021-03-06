import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { ButtonCellRendererComponent } from './button-cell-renderer/button-cell-renderer.component';
import { NotificationComponent } from './notification/notification.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ListPickerComponent } from './list-picker/list-picker.component';
import { OrderByPipe } from './order-by/order-by.pipe';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ZipDropdownComponent } from './zip-dropdown/zip-dropdown.component';
import { TagCloudComponent } from './tag-cloud/tag-cloud.component';

@NgModule({
  declarations: [
    ButtonCellRendererComponent,
    NotificationComponent,
    ConfirmModalComponent,
    ListPickerComponent,
    OrderByPipe,
    ProfileImageComponent,
    ZipDropdownComponent,
    TagCloudComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthModule,
    ButtonCellRendererComponent,
    CommonModule,
    ConfirmModalComponent,
    FormsModule,
    HttpClientModule,
    ListPickerComponent,
    NotificationComponent,
    OrderByPipe,
    ProfileImageComponent,
    TagCloudComponent,
    ZipDropdownComponent
  ]
})
export class SharedModule { }
