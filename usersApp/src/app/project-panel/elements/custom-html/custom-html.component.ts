import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import 'codemirror/mode/htmlmixed/htmlmixed';

@Component({
  selector: 'app-custom-html',
  templateUrl: './custom-html.component.html',
  styleUrls: ['./custom-html.component.css']
})
export class CustomHtmlComponent implements OnInit {

  @Input()
  data;

  @Output() onChanged = new EventEmitter();

  codeConfig = {
    lineNumbers: true,
    theme: 'mdn-like',
    viewportMargin: Infinity,
    mode: 'text/html',
  }

  constructor() { }

  ngOnInit() {
  }

  modelChanged(event){
    this.onChanged.emit();
  }

}
