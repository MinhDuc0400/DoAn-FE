import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
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
    this.angularFireAuth.authState.subscribe(user => {
      this.user = user;
    });
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

  signup(
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string,
    userType: string,
  ) {
    const url = `${environment.serverURL}${environment.user}signup`;
    const body = {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      userType,
    };
    return this.apiService.postAPI<any>(url, body);
  }

  isLoggedIn(): boolean {
    return true;
  }

  resetAuth(): void {
  }

  logout(): Observable<void> {
    return new Observable<void>();
  }
}
