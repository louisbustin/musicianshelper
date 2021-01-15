import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userData: any;
  
  columnDefs = [
    { field: 'email', sortable: true, filter: true },
    { field: 'firstName', sortable: true, filter: true },
    { field: 'lastName', sortable: true, filter: true }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userData = this.userService.getAll();
  }

}
