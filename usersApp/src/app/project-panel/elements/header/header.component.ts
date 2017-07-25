import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() data;
  @ViewChild("header") headerInput: ElementRef;

  constructor() { }

  ngOnInit() {
    this.headerInput.nativeElement.focus();
  }

}
