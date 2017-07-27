import { Component, OnInit, Input,OnChanges,EventEmitter,Output } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableHeaders = [];
  table = [];
  rowCount = 0;
  colCount = 0;

  @Input()
  data;
  @Output() onChanged = new EventEmitter();

  constructor() { }
  ngOnInit() {
    if (this.data.cells.length == 0) {
      this.data.cells = [
        { row: 0, col: 0, value: "" },
        { row: 0, col: 1, value: "" },
        { row: 0, col: 2, value: "" },

        { row: 1, col: 0, value: "" },
        { row: 1, col: 1, value: "" },
        { row: 1, col: 2, value: "" },
      ];
    }
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
      if (this.data.cells[key]["row"] == 0) {
        this.tableHeaders[this.data.cells[key]["col"]]["value"] =
          this.data.cells[key].value;
      } else {
        this.table[this.data.cells[key]["row"] - 1][this.data.cells[key]["col"]]["value"] = this.data.cells[key].value;
      }
    }
  }

  onRowColChange() {
    let newTableHeader = [];
    for (var i = 0; i < this.colCount; i++) {
      newTableHeader[i] = {};
      if (this.tableHeaders[i] != undefined)
        newTableHeader[i].value = this.tableHeaders[i].value;
      else
        newTableHeader[i].value = "";
    }
    this.tableHeaders = newTableHeader;
    let newTab = [];
    for (var i = 0; i < this.rowCount; i++) {
      newTab[i] = [];
      for (var j = 0; j < this.colCount; j++) {
        newTab[i][j] = {};

        if (this.table[i] != undefined && this.table[i][j] != undefined)
          newTab[i][j] =
            this.table[i][j];
        else
          newTab[i][j].value = "";
      }
    }
    this.table = newTab;

    this.data.cells = [];
    for (var i = 0; i < this.tableHeaders.length; i++) {
      var cell = {};
      cell['row'] = 0;
      cell['col'] = i;
      cell['value'] = this.tableHeaders[i].value;
      this.data.cells.push(cell);
    }
    for (var i = 0; i < this.rowCount; i++) {
      for (var j = 0; j < this.colCount; j++) {
        var cell = {};
        cell['row'] = i + 1;
        cell['col'] = j;
        cell['value'] = this.table[i][j].value;
        this.data.cells.push(cell);
      }
    }
    this.onChanged.emit();
  }
  onChange(row, col, value) {
    for (var key in this.data.cells) {
      if(this.data.cells[key].row==row && this.data.cells[key].col==col )
        this.data.cells[key].value=value;
    }
    this.onChanged.emit();
  }

}
