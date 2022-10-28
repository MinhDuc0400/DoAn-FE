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
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.authService.login(this.email.value, this.password.value)
      .then(async (res) => {
          const idTokenResult = await res.user.getIdTokenResult();
          localStorage.setItem('idToken', idTokenResult.token);
          if (this.rememberMe.value) {
            this.authService.updateLocalUser();
          }
          this.router.navigate([URL_HOME]);
          this.isLoading = false;
        },
      )
      .catch(() => {
        this.isLoading = false;
        this.toasterService.danger('', 'ERROR');
      });
  }
}
