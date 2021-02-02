import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineitem.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {
  title = "Line Item Edit";
  submitBtnTitle = "Save";
  lineItemID = 0;
  lineItem: LineItem = null;
  requests: Request[] = [];


  constructor(private lineItemSvc: LineItemService, private requestSvc: RequestService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // get id from url
    this.route.params.subscribe(
      parms => { this.lineItemID = parms['id']; });
    
    // get the line item id
    this.lineItemSvc.getByID(this.lineItemID).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
        console.log("Line Item", this.lineItem);
      },
      err => {
        console.log(err);
      }
    );
    
    // get list of requests
    this.requestSvc.getAll().subscribe(
      resp => {
        this.requests = resp as Request[];
      },
      err => {
        console.log(err);
      }
    );
  }

  save() {
    // save the line item to the DB
    this.lineItemSvc.update(this.lineItem).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
        // forward to the line item list component
        this.router.navigateByUrl("/request-lines/" + this.lineItem.request.id);
      },
      err => {
        console.log(err);
      }
    )
  }

  // compRequest(a: Request, b: Request): boolean {
  //   return a && b && a.id === b.id;
  // }

}
