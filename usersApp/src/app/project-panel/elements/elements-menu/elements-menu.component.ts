import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-elements-menu',
  templateUrl: './elements-menu.component.html',
  styleUrls: ['./elements-menu.component.css']
})
export class ElementsMenuComponent implements OnInit {

  @Input() order;
  @Input() empty;
  @Output() onClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  itemClicked(element: string){
    this.onClicked.emit({'element':element,'order':this.order});
  }

}
