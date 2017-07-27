import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

import { CategoryService } from '../services/category.service';
import { PagesService } from '../services/pages.service';
import { SideNavItemsService } from '../services/side-nav-items.service';

import { ProjectSharedService } from '../../shared/services/project-shared.service';


declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-project-index',
  templateUrl: './project-index.component.html',
  styleUrls: ['./project-index.component.css']
})
export class ProjectIndexComponent implements OnInit {

  project;

  private sub: any;
  projectId;
  pagesList = this.route.snapshot.data['pagesList'];
  categories;
  optionsCategory;
  optionsPages;

  addCategoryForm: FormGroup;
  categoryName;
  isEditForm = false;
  categoryModalTitle = "Add a new category";
  categoryKeyToUpdate;

  addPageForm: FormGroup;
  pageName;
  categoryKeyOfAddedPage;
  parentPageKeyOfAddedPage;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private pagesService: PagesService,
    private sideNavItemsService: SideNavItemsService,
    private projectSharedService: ProjectSharedService) {
    this.optionsCategory = {
      animation: 150,
      onUpdate: (event: any) => {
        var categoriesToUpdate = [];
        var categoryToUpdate = {};
        for (var key in this.categories) {
          if (this.categories[key].order != key) {
            this.categories[key].order = key;
            categoryToUpdate = {};
            categoryToUpdate['order'] = key;
            categoryToUpdate['_id'] = this.categories[key]._id;
            categoriesToUpdate.push(categoryToUpdate);
          }
        }
        this.categoryService.updateOrder(categoriesToUpdate).subscribe();
      }
    };
    this.optionsPages = {
      animation: 150,
      onUpdate: (event: any) => {
        var pagesToUpdate = [];
        var pageToUpdate = {};
        this.categories.forEach(category => {
          for (var key in category.pages) {
            if (key != category.pages[key].order) {
              category.pages[key].order = key;
              pageToUpdate = {};
              pageToUpdate['order'] = key;
              pageToUpdate['_id'] = category.pages[key]._id;
              pagesToUpdate.push(pageToUpdate);
            }
            for (var subkey in category.pages[key].subPages) {
              if (category.pages[key].subPages[subkey].order != subkey) {
                category.pages[key].subPages[subkey].order = subkey;
                pageToUpdate = {};
                pageToUpdate['order'] = subkey;
                pageToUpdate['_id'] = category.pages[key].subPages[subkey]._id;
                pagesToUpdate.push(pageToUpdate);
              }
            }
          }
        });
        this.pagesService.updateOrder(pagesToUpdate).subscribe();
      }
    }
  }
  ngOnInit() {

    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    $('.sidebar').css('overflow', 'scroll');
    $('.modal').modal();

    this.project = this.projectSharedService.project;

    this.buildForm();//categoryForm
    this.buildPageForm();

    this.sub = this.route.parent.params.subscribe(params => {
      this.projectId = params["id"];
    });
    this.categoryService.getCategories(this.projectId)
      .subscribe(
      response => {
        this.categories = response;
        response.forEach(category => {
          this.categories[category.order] = category;
        });
        this.pagesList.forEach(page => {
          if (!page.parentPage) {
            this.categories[page.category.order].pages[page.order] = page;
          }
        });
        this.pagesList.forEach(page => {
          if (page.parentPage) {
            this.categories[page.category.order].pages[this.parentPageOrder(page.parentPage)].subPages[page.order] = page;
          }
        });
        //passing data between parent and child route like a legend
        this.sideNavItemsService.categories = this.categories;
      }
      );
  }
  parentPageOrder(_id): string {
    for (var key in this.pagesList) {
      if (this.pagesList[key]._id == _id)
        return this.pagesList[key].order;
    }
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Category events >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  onRemoveCategory(categoryOrder) {
    if (this.categories[categoryOrder].pages.length != 0)
      Materialize.toast('can\'t delete a category that contains pages', 2000, 'rounded');
    else {
      this.categoryService.remove(this.categories[categoryOrder]._id).subscribe();
      this.categories.splice(categoryOrder, 1);
      for (var key in this.categories) {
        this.categories[key].order = key;
      }
    }
  }
  onAddOrUpdateCategorySubmit() {
    if (this.addCategoryForm.untouched) {
      Materialize.toast('type a  category name ', 2000, 'rounded')
    }
    if (this.addCategoryForm.valid) {
      if (this.isEditForm) {
        this.categoryService
          .updateName(this.addCategoryForm.value['name'], this.categories[this.categoryKeyToUpdate]._id)
          .subscribe(
          response => {
            $('#addOrUpdateCategoryModal').modal('close');
            Materialize.toast('Category Updated succesfully', 2000, 'rounded');
            this.categories[this.categoryKeyToUpdate].name = this.addCategoryForm.value['name'];
            this.addCategoryForm.reset();
          },
          error => {
            this.formErrors['name'] = error['name'];
          }
          );
      } else {
        this.categoryService.add(this.addCategoryForm.value['name'], this.projectId).subscribe(
          response => {
            $('#addOrUpdateCategoryModal').modal('close');
            Materialize.toast('Category added succesfully', 2000, 'rounded');
            this.categories[response.order] = response;
            this.addCategoryForm.reset();
          },
          error => {
            this.formErrors['name'] = error['name'];
          }
        );
      }

    }
  }
  onClickUpdateCategory(order) {
    this.categoryKeyToUpdate = order;
    this.addCategoryForm.reset();
    this.addCategoryForm.controls['name'].setValue(this.categories[order].name);
    this.isEditForm = true;
    this.categoryModalTitle = 'Update category'
    $('#addOrUpdateCategoryModal').modal('open');
    (<HTMLInputElement>document.getElementById('categoryName')).focus();
  }
  onClickAddCategory() {
    this.addCategoryForm.reset();//cause it's the same modal used for both C & U
    this.isEditForm = false;
    this.categoryModalTitle = 'Add a new  category';
    $('#addOrUpdateCategoryModal').modal('open');
    (<HTMLInputElement>document.getElementById('categoryName')).focus();
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Category events <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Page events >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  onClickAddPage(categoryOrder, parentPageOrder) {
    $('#addPageModal').modal('open');
    (<HTMLInputElement>document.getElementById('pageName')).focus();
    this.categoryKeyOfAddedPage = categoryOrder;
    this.parentPageKeyOfAddedPage = parentPageOrder;
  }
  onAddPageSubmit() {
    if (this.addPageForm.untouched) {
      Materialize.toast('type a page name ', 2000, 'rounded')
    }
    if (this.addPageForm.valid) {
      if (this.parentPageKeyOfAddedPage == null) {
        this.pagesService
          .add(this.addPageForm.value['name'], null, this.categories[this.categoryKeyOfAddedPage]._id)
          .subscribe(
          response => {
            $('#addPageModal').modal('close');
            Materialize.toast('Page Added succesfully', 2000, 'rounded');
            this.categories[this.categoryKeyOfAddedPage].pages[response.order] = response;
            this.addPageForm.reset();
            this.router.navigate(['./page', response._id], { relativeTo: this.route });
          },
          error => {
            this.pageFormErrors['name'] = error['name'];
          });
      } else {
        this.pagesService
          .add(this.addPageForm.value['name'],
          this.categories[this.categoryKeyOfAddedPage].pages[this.parentPageKeyOfAddedPage]._id,
          this.categories[this.categoryKeyOfAddedPage]._id)
          .subscribe(
          response => {
            $('#addPageModal').modal('close');
            Materialize.toast('Page Added succesfully', 2000, 'rounded');
            this.categories[this.categoryKeyOfAddedPage]
              .pages[this.parentPageKeyOfAddedPage]
              .subPages[response.order] = response;
            this.addPageForm.reset();
            this.router.navigate(['./page', response._id], { relativeTo: this.route });
          },
          error => {
            this.pageFormErrors['name'] = error['name'];
          });
      }

    }
  }

  onRemovePage(categoryOrder, pageOrder, parentPageOrder) {
    let pageId;
    if (parentPageOrder == null) {
      let pages = this.categories[categoryOrder].pages;
      if (pages[pageOrder].subPages.length != 0) {
        Materialize.toast('can\'t delete a page that contains sub pages', 2000, 'rounded');
      } else {
        pageId = pages[pageOrder]._id
        this.pagesService
          .remove(pages[pageOrder]._id)
          .subscribe();
        pages.splice(pageOrder, 1);

        for (var key in pages) {
          pages[key].order = key;
        }
      }
    } else {
      let pages = this.categories[categoryOrder].pages[parentPageOrder].subPages;
      pageId = pages[pageOrder]._id;
      this.pagesService
        .remove(pages[pageOrder]._id)
        .subscribe();
      pages.splice(pageOrder, 1);
      for (var key in pages) {
        pages[key].order = key;
      }
    }

    if (pageId == this.route.firstChild.snapshot.params['pageId'])
      this.router.navigate(["../docs"], { relativeTo: this.route });
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Page events <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//



  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Category form stuff >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  buildForm(): void {
    this.addCategoryForm = this.fb.group({
      'name': [this.categoryName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500),
      ]
      ]
    });

    this.addCategoryForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.addCategoryForm) { return; }
    const form = this.addCategoryForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
  };
  validationMessages = {
    'name': {
      'required': 'Category Name is required.',
      'minlength': 'Category Name  must be at least 2 characters long.',
      'maxlength': 'Category Name  cannot be more than 500 characters long.',
    },
  };
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Category form stuff <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Page form stuff >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  buildPageForm(): void {
    this.addPageForm = this.fb.group({
      'name': [this.pageName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500),
      ]
      ]
    });

    this.addPageForm.valueChanges
      .subscribe(data => this.onPageFormValueChanged(data));
    this.onPageFormValueChanged();
  }
  onPageFormValueChanged(data?: any) {
    if (!this.addPageForm) { return; }
    const form = this.addPageForm;

    for (const field in this.pageFormErrors) {
      this.pageFormErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.pageFormValidationMessages[field];
        for (const key in control.errors) {
          this.pageFormErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  pageFormErrors = {
    'name': '',
  };
  pageFormValidationMessages = {
    'name': {
      'required': 'Page Name is required.',
      'minlength': 'Page Name  must be at least 2 characters long.',
      'maxlength': 'Page Name  cannot be more than 500 characters long.',
    },
  };

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Page form stuff <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

}
