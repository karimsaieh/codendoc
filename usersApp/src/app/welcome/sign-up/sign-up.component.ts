import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/user';

import { AuthService } from '../services/auth.service';


declare var Materialize: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  user = new User();
  passwordConfirmation;
  userSignUpForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {

    this.user = this.userSignUpForm.value;
    if (this.userSignUpForm.untouched) {
      Materialize.toast('Hmm maybe you need to put your info', 4000, 'rounded');
    }
    if (this.userSignUpForm.valid) {
      if (this.userSignUpForm.get('password').value
        != this.userSignUpForm.get('passwordConfirmation').value) {
        Materialize.toast('Password missmatch', 4000, 'rounded');

      } else {
        this.authService.register(this.user)
          .subscribe(response => {
            console.log(response);
            localStorage.setItem('token', JSON.stringify({ token: response["token"] }));
            localStorage.setItem('user', JSON.stringify(response["user"]));
            this.router.navigate(['/dashboard']);
          },
          error => {
            for (var key in error) {
              this.formErrors[key] = error[key];
            }
            Materialize.toast('Oups something went wrong', 4000, 'rounded');
          });
      }
    }

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.userSignUpForm = this.fb.group({
      'userName': [this.user.userName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),]
      ],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)]
      ],
      'passwordConfirmation': [this.passwordConfirmation, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)]
      ],
      'firstName': [this.user.password, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)]
      ],
      'lastName': [this.user.password, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)]
      ],
      'email': [this.user.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(300),
        Validators.email]
      ]
    });



    this.userSignUpForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {

    if (!this.userSignUpForm) { return; }
    const form = this.userSignUpForm;

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
    'password': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'passwordConfirmation': '',
  };


  validationMessages = {
    'userName': {
      'required': 'Login is required.',
      'minlength': 'Login must be at least 2 characters long.',
      'maxlength': 'Login cannot be more than 100 characters long.',
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password  must be at least 4 characters long.',
      'maxlength': 'Password  cannot be more than 100 characters long.',
    },
    'firstName': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 100 characters long.',
    },
    'lastName': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 100 characters long.',
    },
    'email': {
      'required': 'Email is required.',
      'minlength': 'Email must be at least 8 characters long.',
      'maxlength': 'Email cannot be more than 300 characters long.',
      'email': 'Email is not valid.',
    },
    'passwordConfirmation': {
      'required': 'Please confirm youtr password.',
      'minlength': 'password must be at least 4 characters long.',
      'maxlength': 'password cannot be more than 100 characters long.',
    }
  };
}
