import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BASE_PATH: string = 'users';

  constructor(private webRequestService: WebRequestService) { }

  createUser(user: User) {
    return this.webRequestService.post(`${this.BASE_PATH}`, user);    
  }

  getAll() { 
    return this.webRequestService.get(this.BASE_PATH); 
  }

  update(user: User) {
    return this.webRequestService.put(`${this.BASE_PATH}/${user._id}`, user);
  }

}
