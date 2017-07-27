import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/user';

import { AuthService } from '../services/auth.service';


declare var Materialize :any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user = new User();
  userSignInForm: FormGroup;
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }


  onSubmit() {
    this.user = this.userSignInForm.value;
    if(this.userSignInForm.untouched){
      Materialize.toast('Hmm maybe you need to put your info', 2000,'rounded');
    }
    if(this.userSignInForm.valid){
      this.authService.authenticate(this.user)
      .subscribe(response => {
        localStorage.setItem('token', response["token"]);
        localStorage.setItem('user', JSON.stringify(response["user"]));
        this.router.navigate(['/dashboard']);
      },
      error => {
        for (var key in error) {
          this.formErrors[key] = error[key];
        }
        Materialize.toast('Oups something went wrong', 2000,'rounded');
      });
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userSignInForm = this.fb.group({
      'userName': [this.user.userName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]
      ],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)]
      ]
    });

    this.userSignInForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userSignInForm) { return; }
    const form = this.userSignInForm;

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
    'userName': '',
    'password': ''
  };

  validationMessages = {
    'userName': {
      'required': 'Login is required.',
      'minlength': 'Login must be at least 2 characters long.',
      'maxlength': 'Login cannot be more than 100 characters long.',
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 100 characters long.',
    }
  };

}
