import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { BracketGroup } from '../models/bracket-group';

@Injectable({
  providedIn: 'root'
})
export class BracketGroupsService {

  readonly BASE_PATH: string = 'bracketgroups';

  constructor(private webRequestService: WebRequestService) { }

  create(group: BracketGroup) {
    return this.webRequestService.post(`${this.BASE_PATH}`, group);    
  }

  getAll() { 
    return this.webRequestService.get(this.BASE_PATH); 
  }

  getOne(id: string) {
    return this.webRequestService.get(`${this.BASE_PATH}/${id}`);
  }

  getAllByOwnerId(ownerId: string) {
    return this.webRequestService.get(`${this.BASE_PATH}/byowner/${ownerId}`);
  }

  update(group: BracketGroup) {
    return this.webRequestService.put(`${this.BASE_PATH}/${group._id}`, group);
  }

}
