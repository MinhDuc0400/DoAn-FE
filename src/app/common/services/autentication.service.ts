import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { UserTypeEnum } from '../enum/userType.enum';
import { RegisterRequest, RegisterResponse } from '../interfaces/auth';
import { URL_LOGIN } from '../constants/url.constant';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public user: User;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private apiService: ApiService,
  ) {

    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      try {
        this.user = JSON.parse(currentUser) as User;
      } catch (e) {
        // console.log('Error get current user from storage', e)
      }
    }
    this.angularFireAuth.authState.subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

  updateLocalUser(): void {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.angularFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // OAuthProvider(provider) {
  //   return this.angularFireAuth.signInWithPopup(provider)
  //     .then((res) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       });
  //     }).catch((error) => {
  //       window.alert(error);
  //     });
  // }
  //
  // SigninWithGoogle() {
  //   return this.OAuthProvider(new auth.GoogleAuthProvider())
  //     .then(res => {
  //       console.log('Successfully logged in!');
  //     }).catch(error => {
  //       console.log(error);
  //     });
  // }
  //
  // SignOut() {
  //   return this.afAuth.signOut().then(() => {
  //     this.router.navigate(['login']);
  //   });
  // }

  login(
    email: string,
    password: string,
  ) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signup(
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string,
    userType: UserTypeEnum,
  ) {
    const url = `${environment.serverURL}${environment.user}/signup`;
    const body = {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      userType,
    };
    return this.apiService.postAPI<RegisterResponse, RegisterRequest>(url, body);
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  resetAuth(): void {
    localStorage.removeItem('idToken');
    delete this.user;
  }

  logout(): void {
    localStorage.clear();

    this.user = undefined;
    this.router.navigate([URL_LOGIN]);

  }
}
