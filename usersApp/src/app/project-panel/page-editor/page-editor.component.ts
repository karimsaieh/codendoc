import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../elements/header/header.component';
import { DragulaService } from 'ng2-dragula';

import { PagesService } from '../services/pages.service';
import { SideNavItemsService } from '../services/side-nav-items.service';


@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {

  pageId;
  pageName;
  elements = [];
  saved = true;
  saving = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private dragulaService: DragulaService,
    private pagesService: PagesService,
    private sideNavItemsService: SideNavItemsService,
  @Inject(DOCUMENT) private document: Document) {
    route.params.forEach(params => {
      this.pageId = params['pageId'];
      this.initPage(this.pageId);
    });
    dragulaService.setOptions('elements-bag', {
      moves: function (el, container, handle) {
        return handle.classList.contains('handle');
      }
    });
    dragulaService.dropModel.subscribe((value) => {
      //console.log(`drop: ${value[0]}`);
      this.orderElements(value.slice(1));
    });
  }
  ngOnDestroy() {
    this.dragulaService.destroy('elements-bag');
  }
  ngOnInit() {
  }
  initPage(pageId) {
    this.document.body.scrollTop = 0;
    this.elements = this.route.snapshot.data['page'].elements.sort(function (a, b) { return a.data.order - b.data.order });
    this.pageName = this.route.snapshot.data['page'].page.name;
    this.saved = true;
    this.saving = false;
  }

  onElementsMenuClicked(event) {
    var element;
    switch (event.element) {
      case "header":
        element = { type: 'header', data: { order: event.order, value: '' } };
        break;
      case "textEditor":
        element = { type: 'textEditor', data: { order: event.order, value: '' } };
        break;
      case "codeSample":
        element = { type: 'codeSample', data: { order: event.order, code: '', theme: '', language: '' } };
        break;
      case "callout":
        element = { type: 'callout', data: { order: event.order, type: '', title: '', body: '' } };
        break;
      case "table":
        var tabData = [];//from DB
        element = { type: 'table', data: { order: event.order, cells: tabData } };
        break;
      case "customHtml":
        element = { type: 'customHtml', data: { order: event.order, code: '' } };
        break;
    }
    for (var i = event.order; i < this.elements.length; i++) {
      this.elements[i]['data']['order']++;
    }
    this.elements.splice(event.order, 0, element);
    this.saved = false;
  }

  orderElements(args) {
    let [e, el] = args;
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i]['data']['order'] = i;
    }
    this.saved = false;
  }
  removeElement(order) {
    this.elements.splice(order, 1);
    for (var i = order; i < this.elements.length; i++) {
      this.elements[i]['data']['order']--;
    }
    this.saved = false
  }
  onChanged() {
    this.saved = false;
  }
  save() {
    this.saving = true;
    this.pagesService.updatePage(this.elements, this.pageName, this.pageId).subscribe(
      response => {
        this.saved = true;
        this.saving = false;
        this.sideNavItemsService.categories.forEach(category => {
          if (category.pages != []) {
            category.pages.forEach(page => {
              if (page._id == this.pageId) {
                page.name = this.pageName;
              }
              if (page.subPages != []) {
                page.subPages.forEach(subPage => {
                  if (subPage._id == this.pageId) {
                    subPage.name = this.pageName;
                  }
                });
              }
            });
          }
        });
      },
    );
  }

} 
