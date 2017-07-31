import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectSharedService } from "./../../shared/services/project-shared.service";

declare var $: any;

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.css']
})
export class ProjectPanelComponent implements OnInit {

  firstName = JSON.parse(localStorage.getItem('user'))['firstName'];

  constructor(private router: Router,
    private projectSharedService: ProjectSharedService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    $('.modal').modal();
  }

  logout() {
    if (this.projectSharedService.saved == false) {
      let res = confirm('Unsaved chnages , are you sure you want to logout ??')
      if (res) {
        this.projectSharedService.saved = true;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/welcome']);
      }
    }
    else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/welcome']);
    }
  }

}
