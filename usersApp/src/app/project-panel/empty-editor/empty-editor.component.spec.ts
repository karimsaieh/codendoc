import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyEditorComponent } from './empty-editor.component';

describe('EmptyEditorComponent', () => {
  let component: EmptyEditorComponent;
  let fixture: ComponentFixture<EmptyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
