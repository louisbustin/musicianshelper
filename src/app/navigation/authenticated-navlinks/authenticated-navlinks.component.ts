import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-authenticated-navlinks',
  templateUrl: './authenticated-navlinks.component.html',
  styleUrls: ['./authenticated-navlinks.component.scss']
})
export class AuthenticatedNavlinksComponent {

  constructor(public auth: AuthService) {}

}
