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
  routeToNavigateTo;
  activeRoute;

  constructor(private router: Router,
    private projectSharedService: ProjectSharedService,
    private route: ActivatedRoute) {

    this.route.firstChild.url
      .subscribe(url => {
        this.activeRoute = url[0].path;
      });

  }

  ngOnInit() {
    $('.modal').modal();
    this.routeToNavigateTo = undefined;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome']);
  }

  navigateToPage(route) {
    this.routeToNavigateTo = route;
    if (this.projectSharedService.saved == false)
      $('#NavModal').modal('open');
    else {
      if (this.routeToNavigateTo == "logOut")
        this.logout();
      else {
        if (route == 'docs' || route == 'config') {
          this.router.navigate(['./' + route], { relativeTo: this.route });
          this.activeRoute = route;
        } else {
          this.router.navigate([route]);
        }
      }
    }
  }
  cancelNavigation() {
    $('#NavModal').modal('close');
  }
  confirmNavigation() {
    this.projectSharedService.saved = true;
    $('#NavModal').modal('close');
    if (this.routeToNavigateTo == "logOut")
      this.logout();
    else {
      if (this.routeToNavigateTo == 'docs' || this.routeToNavigateTo == 'config') {
        this.router.navigate(['./' + this.routeToNavigateTo], { relativeTo: this.route });
        this.activeRoute = this.routeToNavigateTo;
      } else {
        this.router.navigate([this.routeToNavigateTo]);
      }
    }

  }

}
