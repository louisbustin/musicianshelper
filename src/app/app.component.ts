import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  pageLoaderActive = true;

  constructor(
    public auth: AuthService, 
    public userService: UserService) {}

  ngOnInit(): void {
    interval(1500).pipe(take(1)).subscribe(() => this.pageLoaderActive = false);
  }


}
