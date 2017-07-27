import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from "../../models/user";
import * as myGlobals from '../../shared/my-globals';
@Injectable()
export class UserService {

  constructor(private http:Http) { }

  update(user: User): Observable<Object> {
    let headers = new Headers(
      { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') 
      });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.patch(myGlobals.url + "api/user", body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    return Observable.throw(error.json() || 'Server error')
  }
}
