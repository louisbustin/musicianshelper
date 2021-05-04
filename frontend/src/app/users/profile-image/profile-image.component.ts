import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import IProfileWithAuthModel from '../models/profile-with-auth-model.model';
import { UsersService } from '../users.service';

/**
 * This component will display an image tag (<img...>) with the current profile picture.
 * If the user has not uploaded a unique one, it will display the profile picture
 * received from Auth0/authentication provider (google/facebook).
 */

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent {
  imageBase64: SafeUrl;
  
  @Input()
  cssClass: string;

  profile$ = this.userService.userProfile$.pipe(
    tap((x: IProfileWithAuthModel) => {
      const STRING_CHAR = x.profilePic.data.data.reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
      }, '');
      const base64String = btoa(STRING_CHAR);
      this.imageBase64 = this.domSanitizer.bypassSecurityTrustUrl(`data:${x.profilePic.contentType};base64, ${base64String}`);
    }));

  constructor(
    private userService: UsersService,
    private domSanitizer: DomSanitizer
  ) { }
}
