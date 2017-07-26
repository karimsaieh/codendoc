import { TestBed, inject } from '@angular/core/testing';

import { ProjectSharedService } from './project-shared.service';

describe('ProjectSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectSharedService]
    });
  });

  it('should be created', inject([ProjectSharedService], (service: ProjectSharedService) => {
    expect(service).toBeTruthy();
  }));
});
