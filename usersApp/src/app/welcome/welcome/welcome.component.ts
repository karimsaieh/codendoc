import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.button-collapse').sideNav();
  }

}
