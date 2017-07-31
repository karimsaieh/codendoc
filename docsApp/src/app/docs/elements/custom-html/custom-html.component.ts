import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-html',
  templateUrl: './custom-html.component.html',
  styleUrls: ['./custom-html.component.css']
})
export class CustomHtmlComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
