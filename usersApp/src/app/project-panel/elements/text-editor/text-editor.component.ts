import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  i:number=0;
  @Input() data;
  @Output() onChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  modelChanged($event) {
    if(this.i!=0)//got to do this, unlike other components, quill triggers ngmodelchange oninit
    this.onChanged.emit();
    this.i++;
  }

}

