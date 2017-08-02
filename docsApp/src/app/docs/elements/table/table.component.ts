import { Component, OnInit, Input } from '@angular/core';

declare var showdown: any;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data;
  tableHeaders = [];
  table = [];
  rowCount = 0;
  colCount = 0;
  constructor() { }

  ngOnInit() {
    var converter = new showdown.Converter();
    this.data.cells.forEach(cell => {
      if (cell.row > this.rowCount)
        this.rowCount = cell.row;
      if (cell.col > this.colCount)
        this.colCount = cell.col;
    });
    this.colCount++;
    for (var i = 0; i < this.rowCount; i++) {
      this.table[i] = [];
      for (var j = 0; j < this.colCount; j++) {
        this.table[i][j] = {};
      }
    }
    for (var i = 0; i < this.colCount; i++) {
      this.tableHeaders[i] = {};
    }
    for (var key in this.data.cells) {
       var html = converter.makeHtml(this.data.cells[key].value).replace(/<ul>/g, '<ul class="browser-default">');
      if (this.data.cells[key]["row"] == 0) {
        this.tableHeaders[this.data.cells[key]["col"]]["value"] =html;
      } else {
        this.table[this.data.cells[key]["row"] - 1][this.data.cells[key]["col"]]["value"] = html;
      }
    }
  }

}
