import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.css']
})
export class ProjectPanelComponent implements OnInit {

   firstName = JSON.parse(localStorage.getItem('user'))['firstName'];

  constructor( private router: Router,) { }

  ngOnInit() {
    $('.modal').modal();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome']);
  }

}
