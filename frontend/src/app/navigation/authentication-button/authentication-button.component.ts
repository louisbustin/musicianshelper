import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-authentication-button',
  templateUrl: './authentication-button.component.html',
  styleUrls: ['./authentication-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationButtonComponent {

  constructor(public auth: AuthService) {}

  blurMenu(event: { target: { blur: () => void; }; }): void {
    event.target.blur();
  }
}
