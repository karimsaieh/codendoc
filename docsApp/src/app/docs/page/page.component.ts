import { Component, OnInit, Inject, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DOCUMENT } from '@angular/platform-browser';

import { SharedProjectService } from "../services/shared-project.service";
import { FeedbackService } from "../services/feedback.service";


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
  sections;
  feedbackValue;
  feedbackSent;
  pageId;

  elements = [];
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedProjectService: SharedProjectService,
    @Inject(DOCUMENT) private document: Document,
    private feedbackService: FeedbackService,
  ) {

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
      this.feedbackValue=undefined;
      this.feedbackSent=false;
      this.pageId=params['pageId'];

    });
  }

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
            this.previousPage = currentPreviousPage;
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

  sendFeedback(value){
    this.feedbackValue=value;
    this.feedbackSent=true,
    this.feedbackService.submit({page:this.pageId,value}).subscribe();
  }
}
