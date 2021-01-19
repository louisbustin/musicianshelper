import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from './user-form/user-form.component';
import { ButtonCellRendererComponent } from '../../button-cell-renderer.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userData: any;
  
  columnDefs = [
    {
      field: "",
      cellRenderer: "btnCellRenderer",
      cellRendererParams: {
        clicked: (rowData: any) => {
          console.log(rowData);
          this.openDialog(rowData);
        },
        buttonText: "Edit",
        buttonClass: "button is-link",
        containerStyle: "display: flex; justify-content: center; align-items: center; height: 100%;"
      },
      width: 100
    },
    { field: 'email', sortable: true, filter: true },
    { field: 'firstName', sortable: true, filter: true },
    { field: 'lastName', sortable: true, filter: true }
  ]; 
  frameworkComponents = {
    btnCellRenderer: ButtonCellRendererComponent
  }

  constructor(private userService: UserService, private dialog: MatDialog) {   
  }

  ngOnInit(): void {
    this.userData = this.userService.getAll();
  }


  openDialog(user: any) {
    const dialogRef = this.dialog.open(UserFormComponent, { data: user });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
