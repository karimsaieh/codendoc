import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from "../shared/services/user.service";

declare var Materialize: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user = JSON.parse(localStorage.getItem('user'))
  firstName = this.user.firstName;

  passwordConfirmation;
  profileForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.buildForm();

  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/welcome']);
  }

  onSubmit() {

    this.user = this.profileForm.value;
    if (this.profileForm.untouched) {
      Materialize.toast('Hmm maybe you need to put your info', 2000, 'rounded');
    }
    if (this.profileForm.valid) {
      if (this.profileForm.get('password').value
        != this.profileForm.get('passwordConfirmation').value) {
        Materialize.toast('Password missmatch', 2000, 'rounded');

      } else {
        this.user._id = JSON.parse(localStorage.getItem('user'))["_id"];
        this.userService.update(this.user).subscribe(
          response => {
            delete this.user['passwordConfirmation'];
            delete this.user['password'];
            this.firstName=this.user.firstName;
            localStorage.setItem('user', JSON.stringify(this.user));
            Materialize.toast('Success', 2000, 'rounded');
            this.router.navigate(['/dashboard']);
          },
          error => {
            for (var key in error) {
              this.formErrors[key] = error[key];
            }
            Materialize.toast('Oups something went wrong', 2000, 'rounded')
          }
        );

      }
    }else{
                  Materialize.toast('Oups something went wrong, will you fill the form ', 2000, 'rounded')

    }

  }


  buildForm(): void {
    console.log(this.user);
    this.profileForm = this.fb.group({
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
      'firstName': [this.user.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)]
      ],
      'lastName': [this.user.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)]
      ],
      'email': [this.user.email, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(300),
        Validators.email]
      ]
    });
    this.profileForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {

    if (!this.profileForm) { return; }
    const form = this.profileForm;

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
