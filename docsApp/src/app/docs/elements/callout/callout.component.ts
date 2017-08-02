import { Component, OnInit, Input } from '@angular/core';

declare var showdown: any;
@Component({
  selector: 'app-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.css']
})
export class CalloutComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit() {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(this.data.body);
    html = html.replace(/<ul>/g, '<ul class="browser-default">');
    this.data.body =  html;
  }

}
