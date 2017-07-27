import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() data;

  @Output() onChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  modelChanged($event){
    this.onChanged.emit();
  }

}
