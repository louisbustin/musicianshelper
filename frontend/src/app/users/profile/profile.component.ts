import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userProfile$ = this.userService.userProfile$;

  constructor(
    private userService: UsersService
  ) { }
}
