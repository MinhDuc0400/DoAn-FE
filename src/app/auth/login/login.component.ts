import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../common/services/autentication.service';
import { URL_HOME, URL_REGISTER } from '../../common/constants/url.constant';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;

  loginForm: FormGroup;

  URL_REGISTER = URL_REGISTER;

  constructor(
    public authService: AuthenticationService,
    private toasterService: NbToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)],
      ),
      rememberMe: new FormControl(false),
    });

    this.rememberMe.valueChanges.subscribe(res => {
      localStorage.setItem('rememberMe', res);
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value)
      .then(async (res) => {
          const idTokenResult = await res.user.getIdTokenResult();
          const rememberMe = this.rememberMe.value || localStorage.getItem('rememberMe');
          localStorage.setItem('idToken', idTokenResult.token);
          this.authService.updateLocalUser();
          this.isLoading = false;
        },
      )
      .catch(() => {
        this.isLoading = false;
        this.toasterService.danger('', 'ERROR');
      });
  }
}
