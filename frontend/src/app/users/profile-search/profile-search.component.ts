import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSearchComponent {

  zipChanged(zipCode: string): void {
    console.log(zipCode);
  }
}
