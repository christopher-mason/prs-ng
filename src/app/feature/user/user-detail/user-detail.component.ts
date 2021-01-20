import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  title = "User Detail";
  user: User = null;
  userID: number = 0;

  constructor(private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // get id from URL
    this.route.params.subscribe(
      parms => {
        this.userID = parms['id']
        console.log(this.userID);
      },
    );
    //get user by ID
    this.userSvc.getByID(this.userID).subscribe(
      resp => {
        this.user = resp as User;
        console.log('User',this.user);
      },
      err => {
        console.log(err);
      }
    );
  }

  // Delete Function
  delete() {
    this.userSvc.delete(this.userID).subscribe(
      resp => {
        this.user = resp as User;
        console.log('User deleted',this.user)
        // forward to the user list component
        this.router.navigateByUrl("/user-list")
      },
      err => {
        console.log(err);
      }
    );
  }

}
