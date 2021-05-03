import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userProfile$ = this.userService.userProfile$.pipe(
    tap((x) => console.log(x)),   
  );

  constructor(
    private userService: UsersService
  ) { }
}
