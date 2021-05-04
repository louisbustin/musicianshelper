/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import IProfileWithAuthModel from '../models/profile-with-auth-model.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-basic.component.html',
  styleUrls: ['./profile-basic.component.scss']
})
export class ProfileBasicComponent {

  @ViewChild('notificationBox') 
  notify: NotificationComponent;

  imageBase64: SafeUrl;

  userProfile$ = this.userService.userProfile$;

  constructor(
    private userService: UsersService,
    private domSanitizer: DomSanitizer
  ) { }

  onFileSelected(event: any): void {
    const file:File = event.target.files[0];
    if (file) {
      this.userService.uploadProfilePic(file);
    }
  }

  saveClick(user: any): void {
    //remove the profilepic, do not need it going up
    user.profilePic = undefined;
    this.userService.updateProfile(user);
    this.notify.open();
  }

}
