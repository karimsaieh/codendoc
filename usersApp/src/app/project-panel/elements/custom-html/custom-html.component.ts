import { Component, OnInit } from '@angular/core';

import 'codemirror/mode/htmlmixed/htmlmixed';

@Component({
  selector: 'app-custom-html',
  templateUrl: './custom-html.component.html',
  styleUrls: ['./custom-html.component.css']
})
export class CustomHtmlComponent implements OnInit {

  htmlCode: string;
  codeConfig = {
    lineNumbers: true,
    theme: 'mdn-like',
    viewportMargin: Infinity,
    mode: 'text/html',
  }

  constructor() { }

  ngOnInit() {
  }

}
