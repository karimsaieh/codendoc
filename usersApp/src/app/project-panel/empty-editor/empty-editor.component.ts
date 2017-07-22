import { Component, OnInit } from '@angular/core';
import { SideNavItemsService } from '../services/side-nav-items.service';

@Component({
  selector: 'app-empty-editor',
  templateUrl: './empty-editor.component.html',
  styleUrls: ['./empty-editor.component.css']
})
export class EmptyEditorComponent implements OnInit {

  constructor(private sideNavItemsService: SideNavItemsService) {
  }

  ngOnInit() {
  }

  //just for testig
  updateSideNavItem() {
    this.sideNavItemsService.categories[0].name = "kkkkkk";
  }

}
