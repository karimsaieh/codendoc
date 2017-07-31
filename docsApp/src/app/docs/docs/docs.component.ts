import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { SharedProjectService } from "../services/shared-project.service";
declare var $: any;
@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  project;
  categories;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedProjectService:SharedProjectService
  ) { }

  ngOnInit() {
    $('.collapsible').collapsible();
    this.activatedRoute.params.subscribe(params => {
      this.initPage();
    }
    );
  }
  initPage() {
    var projectData = this.activatedRoute.snapshot.data['project'];
    if (projectData == undefined)
      this.router.navigate(['anything that will trigger not found'])
    this.project = projectData.project;


    this.categories = projectData.categories.sort(function (a, b) { return a.order - b.order });
    var pages = projectData.pages;

    pages.forEach(page => {
      if (!page.parentPage) {
        this.categories[page.category.order].pages[page.order] = page;
      }
    });
    pages.forEach(page => {
      if (page.parentPage) {
        this.categories[page.category.order].pages[this.parentPageOrder(page.parentPage, pages)].subPages[page.order] = page;
      }
    });
    this.sharedProjectService.categories=this.categories;
    this.sharedProjectService.project=this.project;
  }
  parentPageOrder(_id, pages): string {
    for (var key in pages) {
      if (pages[key]._id == _id)
        return pages[key].order;
    }
  }

  collapseMe(i, j) {
    $('.collapsible').collapsible();//hhhhhhh
  }
}
