import { Component, OnInit, Input } from '@angular/core';
import { CodemirrorComponent } from 'ng2-codemirror';

import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/erlang/erlang';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/go/go';
import 'codemirror/mode/haskell/haskell';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/lua/lua';
import 'codemirror/mode/octave/octave';
import 'codemirror/mode/pascal/pascal';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/stex/stex';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/htmlmixed/htmlmixed';
@Component({
  selector: 'app-code-sample',
  templateUrl: './code-sample.component.html',
  styleUrls: ['./code-sample.component.css']
})
export class CodeSampleComponent implements OnInit {

  @Input() data;
  codeConfig;
  constructor() { }

  ngOnInit() {
     this.codeConfig = {
      lineNumbers: true,
      theme: this.data.theme,
      viewportMargin: Infinity,
      mode: this.data.language,
      readOnly: true,
    }
  }

}
