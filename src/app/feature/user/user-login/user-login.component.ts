import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  title: string = 'Login';
  msg: string = '';
  user: User = new User();

  constructor(private userSvc: UserService, private sysSvc: SystemService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    // call login service using username and password
    
  }

}
