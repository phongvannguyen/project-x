import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormValidationService } from 'src/app/services/form-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public newUser: UserModel = new UserModel();
  public submitted: boolean;
  public loca: string;

  constructor(private fb: FormBuilder, private userService: UserService) {
   }

  ngOnInit() {
    this.buildForm();
    this.getUserLocation();
  }

  public buildForm(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, FormValidationService.validatePassword]],
      repeat_password: ['', [Validators.required]],
      finePrint: ['', []]
    });
  }

  public register(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      console.log('Sign up form is invalid', this.signUpForm);
      return;
    }

    this.newUser.email = this.signUpForm.get('email').value;
    this.newUser.name = this.signUpForm.get('name').value;
    this.newUser.password = this.signUpForm.get('password').value;
    this.newUser.location = this.loca;

    this.userService.register(this.newUser).subscribe((newUser) => {
      console.log('user creation', newUser);
    }, (error) => {
      console.log('there is error creating users');
    });
  }

  public getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.loca = position.coords.latitude + ',' + position.coords.longitude;
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
    }
  }
}
