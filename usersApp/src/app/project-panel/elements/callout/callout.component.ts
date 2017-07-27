import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

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

  @Output() onChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  changeType(type) {
    this.data.type = type;
    this.onChanged.emit();
  }
  modelChanged(event) {
    this.onChanged.emit();
  }

}
