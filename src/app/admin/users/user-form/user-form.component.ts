import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService, 
    public dialogRef: MatDialogRef<UserFormComponent>) 
    { }

  ngOnInit(): void {
    this.model = this.data;
  }

  onSubmit() {
    if (this.model._id === null) {
      this.userService.createUser(this.model).subscribe((response: Response) => {
        this.dialogRef.close(this.model);
      });
    } else {
      this.userService.update(this.model).subscribe((response: Response) => {
        this.dialogRef.close(this.model);
      });      
    }
  }
}
