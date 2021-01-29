import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isSuperUser: boolean;

  constructor(public authService: AuthService) { 
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth) {
        let user: User = JSON.parse(localStorage.getItem('user'));
        this.isSuperUser = user.userType === 'admin';
      }
    })
  }

}
