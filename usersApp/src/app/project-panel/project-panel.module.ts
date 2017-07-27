import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CodemirrorModule } from 'ng2-codemirror';
import { EditorModule } from 'primeng/primeng';
import { SortablejsModule } from 'angular-sortablejs';
import {  DragulaModule } from 'ng2-dragula';


import { ProjectIndexComponent } from './project-index/project-index.component';
import { ProjectPanelComponent } from './project-panel/project-panel.component';
import { ProjectConfigComponent } from './project-config/project-config.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { EmptyEditorComponent } from './empty-editor/empty-editor.component';
import { CodeSampleComponent } from './elements/code-sample/code-sample.component';
import { TextEditorComponent } from './elements/text-editor/text-editor.component';
import { TableComponent } from './elements/table/table.component';
import { CalloutComponent } from './elements/callout/callout.component';
import { HeaderComponent } from './elements/header/header.component';
import { CustomHtmlComponent } from './elements/custom-html/custom-html.component';
import { ElementsMenuComponent } from './elements/elements-menu/elements-menu.component';

import { SharedModule } from './../shared/shared.module';
import { DashboardModule } from './../dashboard/dashboard.module';

import { PagesService } from './services/pages.service';
import { CategoryService } from './services/category.service';
import { SideNavItemsService } from './services/side-nav-items.service';

import { PageResolve } from './resolvers/page-resolve';


import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardModule,
    RouterModule,
    SortablejsModule,
    CodemirrorModule,
    EditorModule,
    DragulaModule,
  ],
  declarations: [ProjectIndexComponent, ProjectPanelComponent, ProjectConfigComponent, PageEditorComponent, EmptyEditorComponent, CodeSampleComponent, TextEditorComponent, TableComponent, CalloutComponent, HeaderComponent, CustomHtmlComponent, SafeHtmlPipe, ElementsMenuComponent],
  providers: [PagesService, CategoryService, SideNavItemsService,PageResolve]
})
export class ProjectPanelModule { }
