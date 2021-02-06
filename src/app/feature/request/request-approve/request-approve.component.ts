import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/lineitem.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  requestTitle = "PurchaseRequest Line Items";
  request: Request = new Request();
  requestID = 0;
  linesTitle = 'Line Items';
  lineItems: LineItem[] = [];
  approveBtn = "Approved";
  rejectBtn = "Reject";

  constructor(private requestSvc: RequestService, private lineItemSvc: LineItemService, 
    private router: Router, private route: ActivatedRoute, private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();

    // get the id from url
    this.route.params.subscribe(
      parms => {
        this.requestID = parms['id'];
      });

    // get request by id
    this.requestSvc.getByID(this.requestID).subscribe(
      resp => {
        this.request = resp as Request;
      },
      err => {
        console.log(err);
      }
    );

    // get line items by request id
    this.lineItemSvc.getLineItemByPr(this.requestID).subscribe(
      resp => {
        this.lineItems = resp as LineItem[];
      },
      err => {
        console.log(err);
      }
    );
  }

  // approve
  approveRequest() {
    this.requestSvc.approveRequest(this.request).subscribe(
      resp => {
        this.router.navigateByUrl("/request-review");
      }
    );
  }

  // reject
  rejectRequest() {
    this.requestSvc.rejectRequest(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        // forward to request review
        this.router.navigateByUrl("/request-review");
      }
    );
  }

}
