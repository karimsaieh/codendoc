import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PagesService } from './../project-panel/services/pages.service';

import { Page } from './../models/page';


@Injectable()
export class PagesListResolve implements Resolve<Page> {

    constructor(private pageService: PagesService) { }

    resolve(route: ActivatedRouteSnapshot) {
       return this.pageService.getPages(route.parent.params["id"]);//projectId
    }

}