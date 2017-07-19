import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import * as myGlobals from '../../shared/my-globals';

import { Page } from '../../models/page';

@Injectable()
export class PagesService {


  constructor(private http: Http) {
  }

  getPages(projectId): Observable<Page> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(myGlobals.url + "api/page?projectId=" + projectId, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.empty<Response>();
  }

  updateOrder(pages): Observable<Object> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      });
    let body = JSON.stringify(pages);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(myGlobals.url + "api/page", body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  add(pageName, parentPage, categoryId): Observable<Page> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      });
    let bodyObject = { name: pageName, category: categoryId }
    if (parentPage)
      bodyObject['parentPage'] = parentPage;
    let body = JSON.stringify(bodyObject);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(myGlobals.url + "api/page", body, options)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json() || 'Server error'));
  }


    remove(pageId): Observable<Page> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token'),
      });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(myGlobals.url + "api/page/"+pageId, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

}
