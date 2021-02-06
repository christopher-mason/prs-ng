import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title = "User Edit";
  user: User = null;
  userID: number = 0;
  submitBtnTitle = "Save";
  isNotAdmin = false;


  constructor(private userSvc: UserService, private sysSvc: SystemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sysSvc.checkLogin();

    if(!(this.sysSvc.loggedInUser.isAdmin)) {
      this.isNotAdmin = true;
    }

    // get all from URL
    this.route.params.subscribe(
      parms => {
        this.userID = parms['id'];
        console.log("UserID: " + this.userID);
      });

    // get by ID
    this.userSvc.getByID(this.userID).subscribe(
      resp => {
        this.user = resp as User;
        console.log("User" + this.user);
      },
      err => {
        console.log(err);
      }
    ); 
  }

  save() {
    this.userSvc.update(this.user).subscribe(
      resp => {
        this.user = resp as User;
        this.router.navigateByUrl("/user-list");
      },
      err => {
        console.log(err);
      }
    );
  }

}
