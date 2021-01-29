import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/lineitem.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  requestTitle = "PurchaseRequest Line Items";
  linesTitle = "Lines";
  request: Request = null;
  lineItems: LineItem[] = [];
  lineItem: LineItem = new LineItem();
  requestID = 0;

  constructor(private lineItemSvc: LineItemService, private requestSvc: RequestService, private sysSvc: SystemService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();

    // get the id from the url
    this.route.params.subscribe(
      parms => {
        this.requestID = parms['id'];
      });

    // get request by id
    this.requestSvc.getByID(this.requestID).subscribe(
      (resp) => {
        this.request = resp as Request;
        console.log('Request', this.request);
      },
      (err) => {
        console.log(err);
      }
    );

    // get lineitems by request ID
    this.lineItemSvc.getLineItemByPr(this.requestID).subscribe(
      (resp) => {
        console.log("li resp: " , resp)
        this.lineItems = resp as LineItem[];
        console.log('LineItems', this.lineItems);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
