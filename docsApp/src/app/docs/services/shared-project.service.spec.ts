import { TestBed, inject } from '@angular/core/testing';

import { SharedProjectService } from './shared-project.service';

describe('SharedProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedProjectService]
    });
  });

  it('should be created', inject([SharedProjectService], (service: SharedProjectService) => {
    expect(service).toBeTruthy();
  }));
});
