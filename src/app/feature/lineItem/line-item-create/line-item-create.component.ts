import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineitem.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title = "Line Item Create";
  submitBtnTitle = "Create";
  request: Request = new Request();
  products: Product[] = [];
  lineItem: LineItem = new LineItem();
  requestID: number = 0;
  

  constructor(private productSvc: ProductService, private requestSvc: RequestService, 
    private lineItemSvc: LineItemService, private router: Router, private route: ActivatedRoute,
      private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    // get ID from URL
    this.route.params.subscribe(
      parms => {
      this.requestID = parms['id'];
    });
    this.requestSvc.getByID(this.requestID).subscribe(
      resp => {
        this.request = resp as Request;
        console.log('Request', this.request);
      },
      err => {
        console.log(err);
      }
    );
    //call product service to populate list of products
    this.productSvc.getAll().subscribe(
      resp => {
        this.products = resp as Product[];
      },
      err => {
        console.log(err);
      }
    );
  }

  save() {
    this.lineItem.request = this.request;

    this.lineItemSvc.create(this.lineItem).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
        console.log('Line item created', this.lineItem);
        this.router.navigateByUrl('/request-lines/'+this.requestID);
      },
      err => {
        console.log(err);
      }
    );

  }

}
