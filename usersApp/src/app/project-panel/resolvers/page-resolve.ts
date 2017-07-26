import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PagesService } from './../../project-panel/services/pages.service';



@Injectable()
export class PageResolve implements Resolve<any> {

    constructor(private pageService: PagesService) { }

    resolve(route: ActivatedRouteSnapshot) {
       return this.pageService.getById(route.params["pageId"]);
    }

}