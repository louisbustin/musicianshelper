import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-profile-music',
  templateUrl: './profile-music.component.html',
  styleUrls: ['./profile-music.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMusicComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private profile: any;

  profile$ = this.userService.userProfile$
  .pipe(tap((x) => this.profile = x));

  constructor(
    private userService: UsersService
  ) { }

  instrumentTagsChanged(tags: string[]): void {
    this.profile.instrumentTags = tags;
    this.userService.updateProfile(this.profile);
  }

  lookingForTagsChanged(tags: string[]): void {
    this.profile.lookingForTags = tags;
    this.userService.updateProfile(this.profile);
  }

 influencesTagsChanged(tags: string[]): void {
    this.profile.influencesTags = tags;
    this.userService.updateProfile(this.profile);
  }
}
