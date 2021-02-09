import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { User } from '../models/user';
import { AuthService } from '@auth0/auth0-angular';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BASE_PATH: string = 'users';

  constructor(private webRequestService: WebRequestService, private authService: AuthService) { }

  createUser(user: User) {
    return this.webRequestService.post(`${this.BASE_PATH}`, user);    
  }

  getAll() { 
    return this.webRequestService.get(this.BASE_PATH); 
  }

  update(user: User) {
    return this.webRequestService.put(`${this.BASE_PATH}/${user._id}`, user);
  }

  getByEmail(email: string) {
    return this.webRequestService.post(`${this.BASE_PATH}/getOneByEmail`, {email})
  }

  getLocalUser() {
    this.authService.isAuthenticated$.pipe(first()).toPromise().then((isAuthenticated) => {
      if (isAuthenticated) {
        return localStorage.get('user');
      }
    })
  }
}
