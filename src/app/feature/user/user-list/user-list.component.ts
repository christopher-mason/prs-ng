import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  title = "User List"
  users: User[] = [];
  isNotAdmin = false;
  isAdmin: boolean = this.sysSvc.isAdmin();


  constructor(private userSvc: UserService, private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();

    if(!(this.sysSvc.loggedInUser.isAdmin)) {
      this.isNotAdmin = true;
    }

    // populate list of users
    this.userSvc.getAll().subscribe(
      resp => {
        this.users = resp as User[];
      },
      err => {
        console.log(err);
      }
    );
  }

}
