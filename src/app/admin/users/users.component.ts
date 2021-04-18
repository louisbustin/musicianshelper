/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserFormComponent } from './user-form/user-form.component';
import { GridOptions } from 'ag-grid-community';
import { ButtonCellRendererComponent } from 'src/app/shared/button-cell-renderer/button-cell-renderer.component';

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
    { field: 'lastName', sortable: true, filter: true },
    { field: 'userType', sortable: true, filter: true }
  ]; 
  frameworkComponents = {
    btnCellRenderer: ButtonCellRendererComponent
  }
  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    frameworkComponents: this.frameworkComponents
  }

  constructor(private dialog: MatDialog) {   
  }

  ngOnInit(): void {
    //this.userData = this.userService.getAll();
  }


  openDialog(user: any) {
    const dialogRef = this.dialog.open(UserFormComponent, { data: user });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== "false") {
        this.gridOptions.api.refreshCells();
      }
    });
  }

  addClicked() {
    const newUser = new User(null, null, null, null, 'user');
    const dialogRef = this.dialog.open(UserFormComponent, { data: newUser });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") {
        this.gridOptions.api.applyTransaction({
          add: [result]
        });
        this.gridOptions.api.refreshCells();
      }
    });
  }
}
