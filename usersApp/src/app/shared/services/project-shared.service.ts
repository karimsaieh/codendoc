import { Injectable } from '@angular/core';

@Injectable()
export class ProjectSharedService {

  project;
  saved;//whether the changes on the page are saved or not 
  currentPageId;//to activate it manually in the side nav
  //activeRoute;//config or docs
  constructor() { }

}
