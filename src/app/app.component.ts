import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { profile } from 'winston';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'bracketweb';
  constructor(public auth: AuthService, public userService: UserService) {}

  ngOnInit(): void {
    //check local storage for the email, if we are authenticated.
    //if the email is in local storage, we can assume we have a record in the db
    //if the email is NOT in local storage, we should create a user record for this Auth0 user

    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        this.auth.user$.toPromise().then((profileInfo) => {
          console.log(profileInfo);
          let localUser = JSON.parse(localStorage.getItem("user"));
          console.log(localUser);
          if (localUser !== null && localUser.email === profileInfo.email) {
            console.log('it thinkgs its good');
            //everything is good
          } else {
            //create the user
            console.log('attempting to create user');
            let user: User = new User(null, profileInfo.email, profileInfo.given_name, profileInfo.family_name, 'user');
            this.userService.createUser(user).toPromise().then((created) => {
              localStorage.setItem("user", JSON.stringify(created));
            });
          }
        })
      }
    })
    
  }


}
