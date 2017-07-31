import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SharedProjectService } from "../services/shared-project.service";

declare var $: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  project;
  categories;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
      private sharedProjectService:SharedProjectService) { }

  ngOnInit() {
    $('.collapsible').collapsible();
      this.categories=this.sharedProjectService.categories;
      this.project =this.sharedProjectService.project;
  }

  goToFirstPage() {
    var firstPage;
    var i = 0;
    while (i < this.categories.length && firstPage == undefined) {
      if (this.categories[i].pages.length != 0) {
        firstPage = this.categories[i].pages[0];
      }
      i++;
    }

    if (firstPage != undefined) {
      this.router.navigate(['../page', firstPage["_id"]], { relativeTo: this.activatedRoute });
    }
  }
}
