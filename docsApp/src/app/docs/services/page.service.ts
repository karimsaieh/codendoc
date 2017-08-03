import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as myGlobals from '../../shared/my-globals';

@Injectable()
export class PageService {

  constructor(private http: Http) {
  }

  getById(pageId): Observable<any> {
    return this.http.get(myGlobals.url + "docs/page/" + pageId)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.empty<Response>();
  }

}
