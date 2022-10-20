import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../common/services/autentication.service';
import { SweetAlert } from '../../common/services/sweet-alert.service';
import { Router } from '@angular/router';
import { URL_LOGIN } from '../../common/constants/url.constant';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private sweetAlert: SweetAlert,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email : new FormControl('' , [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        control => {
          const password = control.parent?.get('password').value;
          const rePassword = control.value;

          return rePassword === password ? null : { notMatch: true };
        }]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        control => {
          const password = control.parent?.get('password').value;
          const rePassword = control.value;

          return rePassword === password ? null : { notMatch: true };
        }]),

    });

    this.checkAuth();
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  checkAuth(): void {
    const isLoggedIn = this.authenticationService.isLoggedIn();
    if (!isLoggedIn) {
      this.sweetAlert.alert('Please login first!', 'error').then(_ => {
        this.router.navigate([URL_LOGIN]);
      });
    }
  }

  register() {

  }

}
