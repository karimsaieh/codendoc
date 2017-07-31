import { Component, OnInit, Inject, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DOCUMENT } from '@angular/platform-browser';

import { SharedProjectService } from "../services/shared-project.service";

declare var $: any;
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, AfterViewChecked {

  categories;
  nextPage;
  previousPage;
  customHtmlTest = '<style>.go{color:red}</style><span class="go">i am custom html</span>';
  tableTest = {
    "order": 2,
    "cells": [
      {
        "_id": "597d2625d8af952c840448bb",
        "row": 0,
        "col": 0,
        "value": "dfsfsd",
        "table": "597d2625d8af952c840448b7",
        "__v": 0
      },
      {
        "_id": "597d2625d8af952c840448bc",
        "row": 0,
        "col": 1,
        "value": "",
        "table": "597d2625d8af952c840448b7",
        "__v": 0
      },
      {
        "_id": "597d2625d8af952c840448be",
        "row": 1,
        "col": 0,
        "value": "",
        "table": "597d2625d8af952c840448b7",
        "__v": 0
      },
      {
        "_id": "597d2625d8af952c840448bf",
        "row": 1,
        "col": 1,
        "value": "",
        "table": "597d2625d8af952c840448b7",
        "__v": 0
      },
      {
        "_id": "597d2625d8af952c840448c0",
        "row": 1,
        "col": 2,
        "value": "",
        "table": "597d2625d8af952c840448b7",
        "__v": 0
      },
      {
        "_id": "597d2625d8af952c840448bd",
        "row": 0,
        "col": 2,
        "value": "",
        "table": "597d2625d8af952c840448b7",
        "__v": 0
      }

      ,

      {
        "_id": "597d2625d8af952c840448bd",
        "row": 0,
        "col": 3,
        "value": "",
        "table": "597d2625d8af952c840448b7",
        "__v": 0
      }, {
        "_id": "597d2625d8af952c840448bd",
        "row": 1,
        "col": 3,
        "value": "h u yu yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui yiy ui yui ",
        "table": "597d2625d8af952c840448b7",
        "__v": 0
      }
    ]
  }
  ;
  textEditorTest = '<p class="ql-align-center"><strong class="ql-size-large" style="color: rgb(102, 185, 102);">Approachable</strong></p><p class="ql-align-center">Already know HTML, CSS and JavaScript? Read the guide and start building things in no time!</p><p class="ql-align-center"><br></p><p class="ql-align-center"><strong class="ql-size-large" style="color: rgb(102, 185, 102);">Versatile</strong></p><p class="ql-align-center">Simple, minimal core with an incrementally adoptable stack that can handle apps of any scale.</p><p class="ql-align-center"><br></p><p class="ql-align-center"><strong class="ql-size-large" style="color: rgb(102, 185, 102);">Performant</strong></p><p class="ql-align-center">20kb min+gzip Runtime</p><p class="ql-align-center">Blazing Fast Virtual DOM</p><p class="ql-align-center">Minimal Optimization Efforts</p>';

  elements = [];
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedProjectService: SharedProjectService,
    @Inject(DOCUMENT) private document: Document) {

  }
  //and the code below is the reason why we should never use jquery + angular
  x = 0
  ngAfterViewChecked() {
    if (this.x == 0) {
      this.x++
      $('.scrollspy').scrollSpy();
    }
  }

  ngOnInit() {

    this.categories = this.sharedProjectService.categories;
    this.activatedRoute.params.subscribe(params => {
      this.elements = this.activatedRoute.snapshot.data['page'].elements.sort(function (a, b) { return a.data.order - b.data.order });
      this.initPreviousNextPages(params['pageId']);
      this.initScrollSpySections();
      this.document.body.scrollTop = 0;
      $('.scrollspy').scrollSpy();
      this.x = 0;//scrollspyFix:  ngAfterViewChecked()

    });
  }
  sections;//empty and content+noheader ?
  initScrollSpySections() {
    this.sections = [];
    var i = 0;
    if (this.elements.length > 0)
      this.sections[i] = [];
    for (var key in this.elements) {
      if (this.elements[key].type != 'header') {
        this.sections[i].push(this.elements[key]);
      } else {
        if (this.sections[i].length == 0) {
          this.sections[i].push(this.elements[key]);
        } else {
          i++;
          this.sections[i] = [];
          this.sections[i].push(this.elements[key]);
        }

      }
    }
  }
  initPreviousNextPages(currentPageId) {
    this.nextPage = null;
    this.previousPage = null;
    var nextIsAhead = false;
    for (var i in this.categories) {
      for (var j in this.categories[i].pages) {
        if (nextIsAhead == true) {
          this.nextPage = this.categories[i].pages[j];
          nextIsAhead = false;
        }
        if (this.categories[i].pages[j]._id == currentPageId) {
          nextIsAhead = true;
          this.previousPage = currentPreviousPage;
        }
        var currentPreviousPage = this.categories[i].pages[j];
        for (var k in this.categories[i].pages[j].subPages) {
          if (nextIsAhead == true) {
            this.nextPage = this.categories[i].pages[j].subPages[k];
            nextIsAhead = false;
          }
          if (this.categories[i].pages[j].subPages[k]._id == currentPageId) {
            nextIsAhead = true;
            this.previousPage = currentPreviousPage;//clone object
          }
          var currentPreviousPage = this.categories[i].pages[j].subPages[k];
        }
      }
    }
  }
  goToNextPage() {
    this.router.navigate(['../../page', this.nextPage._id], { relativeTo: this.activatedRoute })
  }

  goToPreviousPage() {
    this.router.navigate(['../../page', this.previousPage._id], { relativeTo: this.activatedRoute })
  }
}
