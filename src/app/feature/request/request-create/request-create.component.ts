import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title = "Request Create";
  submitBtnTitle = "Create";
  request: Request = new Request();


  constructor(private requestSvc: RequestService, private router: Router, private route: ActivatedRoute, 
    private sysSvc: SystemService) { }

  ngOnInit(): void {
  }

  save() {
    // set the requested user to the current user
    this.request.user = this.sysSvc.loggedInUser;


    this.requestSvc.create(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        console.log("Request created",this.request);
        this.router.navigateByUrl("/request-list");
      },
      err => {
        console.log(err);
      }
    );
  }

}
