import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { IUser } from '../../api/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BASE_PATH: string = 'users';

  constructor(private webRequestService: WebRequestService) { }

  createUser(user: IUser) {
    return this.webRequestService.post(`${this.BASE_PATH}`, user);    
  }

  getAll() { 
    let stuff = this.webRequestService.get(this.BASE_PATH); 
    console.log(stuff);
    return stuff;
  }

}
