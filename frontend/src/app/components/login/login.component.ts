import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public tempUser: UserModel = new UserModel();
  public submitted: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('There is problem with signing you in', this.loginForm);
      return;
    }

    this.tempUser.email = this.loginForm.get('email').value;
    this.tempUser.password = this.loginForm.get('password').value;

    this.userService.login(this.tempUser).subscribe((userProfile) => {
      this.router.navigate(['my-listings']);
    }, (error) => {
      console.log('there is error loggin users');
    });
  }

}
