import { TestBed, inject } from '@angular/core/testing';

import { SideNavItemsService } from './side-nav-items.service';

describe('SideNavItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SideNavItemsService]
    });
  });

  it('should be created', inject([SideNavItemsService], (service: SideNavItemsService) => {
    expect(service).toBeTruthy();
  }));
});
