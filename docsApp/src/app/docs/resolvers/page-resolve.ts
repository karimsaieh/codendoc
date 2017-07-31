import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PageService } from '../services/page.service';



@Injectable()
export class PageResolve implements Resolve<any> {

    constructor(private pageService: PageService) { }

    resolve(route: ActivatedRouteSnapshot) {
       return this.pageService.getById(route.params["pageId"]);
    }

}