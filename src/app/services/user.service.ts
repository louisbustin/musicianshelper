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

  /**
   * Returns a Promise of the local users User object.
   * the promise is rejected 
   *  1) if the request is not authenticated
   *  2) if the local user is not in localStorage for some reason
   */
  getLocalUser() {
    return new Promise((resolve, reject) => {
      this.authService.isAuthenticated$.pipe(first()).toPromise().then((isAuthenticated) => {
        if (isAuthenticated) {
          let localUser = localStorage.getItem('user');
          if (localUser) {
            resolve(JSON.parse(localUser));
          } else {
            reject("no local user");
          }
        } else {
          reject("not authenticated");
        }
      });
    })
  }
}
