import { Component, OnInit } from '@angular/core';

declare var Materialize :any;

@Component({
  selector: 'app-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.css']
})
export class CalloutComponent implements OnInit {


  type = "info";
  title;
  body;

  constructor() { }

  ngOnInit() {
  }

}
