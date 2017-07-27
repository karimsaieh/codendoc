import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Project } from '../../models/project';

import { ProjectService } from '../services/project.service';


declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  firstName = JSON.parse(localStorage.getItem('user'))['firstName'];

  addProjectForm: FormGroup;
  project = new Project();
  img;
  imgType;
  projectList;

  constructor(private router: Router,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute) {

  this.router.events
      .filter(e => e instanceof NavigationEnd)
      .pairwise().subscribe((e) => {
        if (e[0]["url"] == "/welcome/signup") {
          $('.tap-target').tapTarget('open');
        }
      });


  }

  ngOnInit() {
    $('.modal').modal();
    this.projectList = this.route.snapshot.data['projectList'];
    this.buildForm();  
  }

  onSubmit() {
    if (this.addProjectForm.valid) {
      if (!this.img) {
        Materialize.toast('Upload a logo please!', 2000, 'rounded')
      } else {
        this.project = this.addProjectForm.value;
        this.project.img = this.img;
        this.projectService.create(this.project).subscribe(
          response => {
            $('#addProjectModal').modal('close');
            (<HTMLInputElement>document.getElementById('filePath')).value = null;
            (<HTMLInputElement>document.getElementById('fileUpload')).value = null;
            this.addProjectForm.reset();
            this.img = null;
            Materialize.toast('Project added succesfully', 2000, 'rounded');
            this.projectList.push(response);
          }, error => {
            this.formErrors['name'] = error['name'];
          }
        );
      }
    }
  }
  buildForm(): void {
    this.addProjectForm = this.fb.group({
      'name': [this.project.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]
      ]
    });

    this.addProjectForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.addProjectForm) { return; }
    const form = this.addProjectForm;

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
      'required': 'Project Name is required.',
      'minlength': 'Project Name  must be at least 2 characters long.',
      'maxlength': 'Project Name  cannot be more than 100 characters long.',
    },
  };
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome']);
  }


  onChange(event) {
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.img = btoa(binaryString);
  }
}
