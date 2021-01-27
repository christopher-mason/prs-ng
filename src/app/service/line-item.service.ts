import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineItem } from '../model/lineitem.class';

const URL = "http://localhost:8080/line-items";
@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(private http: HttpClient) { }

// get all line items
getAll() : Observable<LineItem[]> {
  return this.http.get(URL+'/') as Observable<LineItem[]>;
}

// get line item by id
getByID(id) : Observable<LineItem> {
  return this.http.get(URL+'/'+id) as Observable<LineItem>;
}

// create LineItem
create(lineItem: LineItem) : Observable<LineItem> {
  return this.http.post(URL+'/', LineItem) as Observable<LineItem>;
}

// update LineItem
update(lineItem: LineItem) : Observable<LineItem> {
  return this.http.put(URL+'/', LineItem) as Observable<LineItem>;
}

// delete LineItem
delete(id) : Observable<LineItem> {
  return this.http.delete(URL+'/'+id) as Observable<LineItem>;
}

// get line item by Request ID
getLineItemByPr(id) : Observable<LineItem[]> {
  return this.http.get(URL+'/lines-for-pr/'+id) as Observable<LineItem[]>;
}

}
