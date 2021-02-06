import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title = "PurchaseRequest List";
  requests: Request[] = [];
  requestID: number = 0;

  constructor(private requestSvc: RequestService, private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    console.log("Calling review request");
    this.requestSvc.reviewRequest(this.sysSvc.loggedInUser.id).subscribe(
      resp => {
        this.requests = resp as Request[];
        console.log("Requests for review: ",this.requests);
      },
      err => {
        console.log(err);
      }
    );
  }
}
