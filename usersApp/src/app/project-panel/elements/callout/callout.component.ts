import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var Materialize: any;

@Component({
  selector: 'app-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.css']
})
export class CalloutComponent implements OnInit {
  _data;
  @Input()
  set data(data) {
    data.type = data.type || 'info';
    this._data = data;
  }
  get data() { return this._data; }

  constructor() { }

  ngOnInit() {
  }

}
