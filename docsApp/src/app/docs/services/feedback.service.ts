import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as myGlobals from '../../shared/my-globals';

@Injectable()
export class FeedbackService {

  constructor(private http: Http) {
  }

  submit(feedback): Observable<any> {
    let headers = new Headers(
      {
          'Content-Type': 'application/json'
      });
        let body = JSON.stringify(feedback);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(myGlobals.url + "docs/feedback/", feedback, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.empty<Response>();
  }

}
