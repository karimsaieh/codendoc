import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableHeaders = [{ value: "" }, { value: "" }, { value: "" }];
  table = [
    [{ value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }],
  ];
  rowCount: number = 2;
  colCount: number = 3;
  constructor() { }

  ngOnInit() {
    //importing data demo 
  //   var data = [
  //     { "row": 0, "col": 0, "value": "hhh" },
  //     { "row": 1, "col": 0, "value": "hhddddddddh" },];
  //   var cols = 1;
  //   var rows = 1;
  //   var ths = [];
  //   var tds = [];
  //   for (var i = 0; i < rows; i++) {
  //     tds[i] = [];
  //     for (var j = 0; j < cols; j++) {
  //       tds[i][j] = {};
  //     }
  //   }
  //   for (var i = 0; i < cols; i++) {
  //     ths[i]={};
  //   }
  //   for (var key in data) {
  //     if (data[key]["row"] == 0) {
  //       ths[data[key]["col"]]["value"] =
  //        data[key].value;
  //     } else {
  //       tds[data[key]["row"]-1][data[key]["col"]]["value"] = data[key].value; 
  //     }
  //   }
  //   this.tableHeaders = ths;
  //   this.colCount = cols;
  //   this.rowCount = rows;
  //   this.table = tds;
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

    //exporting data demo
    // var result = [];
    // for (var i = 0; i < this.tableHeaders.length; i++) {
    //   var cell = {};
    //   cell['row'] = 0;
    //   cell['col'] = i;
    //   cell['value'] = this.tableHeaders[i].value;
    //   result.push(cell);
    // }
    // for (var i = 0; i < this.rowCount; i++) {
    //   for (var j = 0; j < this.colCount; j++) {
    //     var cell = {};
    //     cell['row'] = i + 1;
    //     cell['col'] = j;
    //     cell['value'] = this.table[i][j].value;
    //     result.push(cell);
    //   }
    // }
    // console.log(result);
  }
}
