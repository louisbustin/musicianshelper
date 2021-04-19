import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  model: User = null;

  hidden = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: User, 
    public dialogRef: MatDialogRef<UserFormComponent>) 
    { }

  ngOnInit(): void {
    this.model = this.data;
  }

  onSubmit(): void {
    /*
    if (this.model._id === null) {
      this.userService.createUser(this.model).toPromise().then((response: Response) => {
        this.dialogRef.close(this.model);
      });
    } else {
      this.userService.update(this.model).toPromise().then((response: Response) => {
        this.dialogRef.close(this.model);
      });      
    }*/
  }
}
