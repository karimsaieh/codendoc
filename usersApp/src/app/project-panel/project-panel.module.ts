import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TreeModule } from 'angular-tree-component';

import { ProjectIndexComponent } from './project-index/project-index.component';
import { ProjectPanelComponent } from './project-panel/project-panel.component';
import { SharedModule } from './../shared/shared.module';
import { DashboardModule } from './../dashboard/dashboard.module';

import { PagesService} from './services/pages.service';
import { CategoryService} from './services/category.service';

import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardModule,
    RouterModule,
    SortablejsModule,
    TreeModule
  ],
  declarations: [ProjectIndexComponent, ProjectPanelComponent],
  providers:[PagesService,CategoryService]
})
export class ProjectPanelModule { }
