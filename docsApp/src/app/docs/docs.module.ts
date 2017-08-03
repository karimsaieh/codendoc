import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodemirrorModule } from 'ng2-codemirror';

import { SharedModule } from '../shared/shared.module';

import { DocsRoutingModule } from './docs-routing.module';

import { DocsComponent } from './docs/docs.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageComponent } from './page/page.component';
import { HeaderComponent } from './elements/header/header.component';
import { TextEditorComponent } from './elements/text-editor/text-editor.component';
import { CodeSampleComponent } from './elements/code-sample/code-sample.component';
import { TableComponent } from './elements/table/table.component';
import { CustomHtmlComponent } from './elements/custom-html/custom-html.component';
import { CalloutComponent } from './elements/callout/callout.component';

import { PageService } from './services/page.service';
import { ProjectService } from './services/project.service';
import { FeedbackService } from './services/feedback.service';
import { SharedProjectService } from './services/shared-project.service';

import { PageResolve } from "./resolvers/page-resolve";
import { ProjectResolve } from "./resolvers/project-resolve";
import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
  imports: [
    CommonModule,
     CodemirrorModule,
    DocsRoutingModule,
    SharedModule,
  ],
  declarations: [DocsComponent, LandingPageComponent, PageComponent, HeaderComponent, TextEditorComponent, CodeSampleComponent, TableComponent, CustomHtmlComponent, CalloutComponent, SafeHtmlPipe],
  providers:[PageService,ProjectService,FeedbackService,PageResolve,ProjectResolve,SharedProjectService],
})
export class DocsModule { }
