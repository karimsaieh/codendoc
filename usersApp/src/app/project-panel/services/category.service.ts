import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import * as myGlobals from '../../shared/my-globals';

import { Category } from '../../models/category';


@Injectable()
export class CategoryService {

  constructor(private http: Http) {
  }

  getCategories(projectId): Observable<Category[]> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token')
      });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(myGlobals.url + "api/category?projectId=" + projectId, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.empty<Response>();
  }

  updateOrder(categories): Observable<Object> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      });
    let body = JSON.stringify(categories);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(myGlobals.url + "api/category",body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  add(categoryName,projectId): Observable<Category> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      });
    let body = JSON.stringify({name:categoryName,project:projectId});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(myGlobals.url + "api/category",body, options)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json() || 'Server error'));
  }

    remove(categoryId): Observable<Category> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token'),
      });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(myGlobals.url + "api/category/"+categoryId, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


    updateName(categoryName,categoryId): Observable<Object> {
    let headers = new Headers(
      {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      });
    let body = JSON.stringify({'name':categoryName});
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(myGlobals.url + "api/category/"+categoryId,body, options)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json() || 'Server error'));
  }
}
