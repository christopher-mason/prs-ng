import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../model/request.class';
import { Observable } from 'rxjs';

const URL = "http://localhost:8080/requests";
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  // get all requests
  getAll(): Observable<Request[]> {
    return this.http.get(URL+'/') as Observable<Request[]>;
  }

  // get by request ID
  getByID(id): Observable<Request> {
    return this.http.get(URL+'/'+id) as Observable<Request>;
  }

  // create request
  create(request: Request): Observable<Request> {
    return this.http.post(URL+'/', request) as Observable<Request>;
  }

  // update a request
  update(request: Request): Observable<Request> {
    return this.http.put(URL+'/', request) as Observable<Request>;
  }

  // delete request
  delete(id): Observable<Request> {
    return this.http.delete(URL+'/'+id) as Observable<Request>;
  }

  //submit for review
  submitForReview(request: Request) : Observable<Request> {
    return this.http.put(URL+'/submit-review', request) as Observable<Request>;
  }

  //request review
  reviewRequest(id: number) : Observable<Request[]> {
    return this.http.get(URL+'/list-review/'+id) as Observable<Request[]>;
  }

  // approve a request
  approveRequest(request: Request) : Observable<Request> {
    return this.http.put(URL+'/approve', request) as Observable<Request>;
  }

  // reject a request
  rejectRequest(request: Request) : Observable<Request> {
    return this.http.put(URL+'/reject', request) as Observable<Request>;
  }
}
