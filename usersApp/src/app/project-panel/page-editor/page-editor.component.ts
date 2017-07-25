import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../elements/header/header.component';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {

  elements = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef, route: ActivatedRoute, private dragulaService: DragulaService) {
    route.params.forEach(params => {
      this.initPage(params['pageId']);
    });
    dragulaService.setOptions('elements-bag', {
      moves: function (el, container, handle) {
        return handle.classList.contains('handle');
      }
    });
    dragulaService.dropModel.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.orderElements(value.slice(1));
    });
  }
  ngOnInit() {
  }
  initPage(pageId) {
    this.elements = [];//rechargement de db necessaire

  }

  onElementsMenuClicked(event) {
    var element;
    switch (event.element) {
      case "header":
        element = { type: 'header', data: {order: event.order, value: '' } };
        break;
      case "textEditor":
        element = {type: 'textEditor', data: { order: event.order, value: '' } };
        break;
      case "codeSample":
        element = {type: 'codeSample', data: { order: event.order, code: '', theme: '', language: '' } };
        break;
      case "callout":
        element = {type: 'callout', data: { order: event.order, type: '', title: '', body: '' } };
        break;
      case "table":
        var tabData = [];//from DB
        element = {type: 'table', data: { order: event.order, data: tabData } };
        break;
      case "customHtml":
        element = {type: 'customHtml', data: { order: event.order, code: '' } };
        break;
    }
    for (var i = event.order; i < this.elements.length; i++) {
      this.elements[i]['data']['order']++;
    }
    this.elements.splice(event.order, 0, element);
  }

  orderElements(args) {
    let [e, el] = args;
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i]['data']['order'] = i;
    }
  }
  removeElement(order) {
    this.elements.splice(order, 1);
    for (var i = order; i < this.elements.length; i++) {
      this.elements[i]['data']['order']--;
    }
  }

} 
