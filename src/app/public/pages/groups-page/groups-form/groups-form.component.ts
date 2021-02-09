import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BracketGroup } from 'src/app/models/bracket-group';
import { BracketGroupsService } from 'src/app/services/bracket-groups.service';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.scss']
})
export class GroupsFormComponent implements OnInit {
  model: BracketGroup = null;

  hidden = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: BracketGroup, 
    private bracketGroupService: BracketGroupsService, 
    public dialogRef: MatDialogRef<GroupsFormComponent>) 
    { }

  ngOnInit(): void {
    this.model = this.data;
  }

  onSubmit() {
    if (this.model._id === null) {
      this.bracketGroupService.create(this.model).toPromise().then((response: Response) => {
        this.dialogRef.close(response.body);
      });
    } else {
      this.bracketGroupService.update(this.model).toPromise().then((response: Response) => {
        this.dialogRef.close(response.body);
      });      
    }
  }

}
