import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { PageEditorComponent } from '../project-panel/page-editor/page-editor.component';

@Injectable()
export class PageCanDeactivate implements CanDeactivate<PageEditorComponent> {

  canDeactivate(component: PageEditorComponent) {
    return component.canDeactivate();
  }

}
