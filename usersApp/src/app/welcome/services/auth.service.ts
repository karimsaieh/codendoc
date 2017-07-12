import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import * as myGlobals from '../../shared/my-globals';

import { User } from '../../models/user';




@Injectable()
export class AuthService {
  
  constructor(private http: Http) {
    console.log(myGlobals.url);
  }

  authenticate(user: User): Observable<Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify(user);
    console.log(body);
    return this.http.post(myGlobals.url + "auth/authenticate", body, options)
      .map((res: Response) => res.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }


  register(user: User): Observable<Object> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify(user);
    console.log(body);
    return this.http.post(myGlobals.url + "auth/register", body, options)
      .map((res: Response) => res.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.log(error.status);
    return Observable.throw(error.json() || 'Server error')
  }
  //provide service in module and inject it
}
