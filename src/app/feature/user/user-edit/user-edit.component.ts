import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
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


  constructor(private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
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
        console.log("User Saved", this.user);
        this.router.navigateByUrl("/user-list");
      },
      err => {
        console.log(err);
      }
    );
  }

}
