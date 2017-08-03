import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as myGlobals from '../../shared/my-globals';

@Injectable()
export class FeedbackService {

  constructor(private http: Http) {
  }

  getFeedbacks(pageId): Observable<any> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(myGlobals.url + "api/feedback?pageId=" + pageId, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.empty<Response>();
  }
}
