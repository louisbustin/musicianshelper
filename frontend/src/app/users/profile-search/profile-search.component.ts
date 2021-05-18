import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSearchComponent {

  selectedZip: string;
  searchRadius = 10;

  searchResults$ = this.userService.searchResults$;

  constructor(
    private userService: UsersService
  ) { }

  zipChanged(zipCode: string): void {
    this.selectedZip = zipCode;
  }

  searchClick(): void {
    this.userService.searchProfiles(this.selectedZip, this.searchRadius);
  }
}
