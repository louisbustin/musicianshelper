/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import IProfile from 'src/app/users/models/profile.model';
import IProfileWithAuthModel from '../../users/models/profile-with-auth-model.model';
import { UsersService } from '../services/users.service';

/**
 * This component will display an image tag (<img...>) with the current profile picture.
 * If the user has not uploaded a unique one, it will display the profile picture
 * received from Auth0/authentication provider (google/facebook).
 */

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileImageComponent implements OnInit {
  imageBase64: SafeUrl;
  
  @Input()
  cssClass: string;

  @Input()
  userId: string;

  profileWithModel$: Observable<IProfileWithAuthModel>;
  profile$: Observable<IProfile>;

  constructor(
    private userService: UsersService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (this.userId) {
      // just get the profile itself, don't worry about combining with Auth0 Models.
      this.profile$ = this.userService.getProfileById(this.userId).pipe(
        tap((x: IProfile) => {
          if (x.profilePic) {
            const STRING_CHAR = x.profilePic.data.data.reduce((data, byte)=> {
              return data + String.fromCharCode(byte);
            }, '');
            const base64String = btoa(STRING_CHAR);
            this.imageBase64 = this.domSanitizer.bypassSecurityTrustUrl(`data:${x.profilePic.contentType};base64, ${base64String}`);
          }          
        })

      );
    } else {
      this.profileWithModel$ = this.userService.userProfile$.pipe(
        take(1),
        tap((x: any) => {
          if (x.ssoProfilePicLink !== x.authModel.picture) {
            x.ssoProfilePicLink = x.authModel.picture;
            this.userService.updateProfile(x);
          }
          if (x.profilePic) {
            const STRING_CHAR = x.profilePic.data.data.reduce((data, byte)=> {
              return data + String.fromCharCode(byte);
            }, '');
            const base64String = btoa(STRING_CHAR);
            this.imageBase64 = this.domSanitizer.bypassSecurityTrustUrl(`data:${x.profilePic.contentType};base64, ${base64String}`);
          }
        }));
    }
  }
}
