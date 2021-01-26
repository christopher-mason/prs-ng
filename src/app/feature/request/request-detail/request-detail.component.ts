import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  title = "Request Detail";
  request: Request = null;
  requestId: number = 0;

  constructor(private requestSvc: RequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // get the id from the url
    this.route.params.subscribe(
      parms => {
        this.requestId = parms['id'];
      });
    // get request by id
    this.requestSvc.getByID(this.requestId).subscribe(
      resp => {
        this.request = resp as Request;
      },
      err => {
        console.log(err);
      }
    )
  }

  delete() {
    // delete the request from the DB
    this.requestSvc.delete(this.request.id).subscribe(
      resp => {
        this.request = resp as Request;
        // forward to the request list component
        this.router.navigateByUrl("/request-list");
      },
      err => {
        console.log(err);
      }
    );
  }

}
