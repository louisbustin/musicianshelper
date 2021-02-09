import { Component, OnInit } from '@angular/core';
import { BracketGroupsService } from 'src/app/services/bracket-groups.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { GroupsFormComponent } from './groups-form/groups-form.component';
import { UserService } from 'src/app/services/user.service';
import { BracketGroup } from 'src/app/models/bracket-group';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  bracketGroupsData$: any; //this will be an observable list of BracketGroups

  constructor(
    private groupsService: BracketGroupsService, 
    private dialog: MatDialog, 
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.userService.getLocalUser().then((user: User) => {
      this.bracketGroupsData$ = this.groupsService.getAllByOwnerId(user._id);
    });
  }

  openDialog(bracketGroup: any) {
    const dialogRef = this.dialog.open(GroupsFormComponent, { data: bracketGroup });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== "false") {
        //this.gridOptions.api.refreshCells();
      }
    });
  }


  addClicked() {
    this.userService.getLocalUser().then((localUser: User) => {
      let newGroup = new BracketGroup(null, null, null, null, localUser);
      const dialogRef = this.dialog.open(GroupsFormComponent, { data: newGroup });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result === "true") {
        }
      });
    })
  }

}
