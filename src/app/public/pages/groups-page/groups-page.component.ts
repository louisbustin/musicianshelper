import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BracketGroupsService } from 'src/app/services/bracket-groups.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  bracketGroupsData$: any; //this will be an observable list of BracketGroups

  constructor(private groupsService: BracketGroupsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(first()).toPromise().then((isAuthenticated) => {
      if (isAuthenticated) {
        let localUser = localStorage.get('user');
        this.bracketGroupsData$ = this.groupsService.getAllByOwnerId(localUser._id);
      }
    })
    
  }

}
