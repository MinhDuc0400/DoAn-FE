import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/autentication.service';
import { URL_LOGIN } from '../constants/url.constant';
@Injectable({ providedIn: 'root' })
export class LandlordGuard implements CanActivate {
  checkAuth: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    const isAdmin = localStorage.getItem('userType') === 'landlord';

    if (!isAdmin) {
      this.backToLogin();
      return of(false);
    } else {
      return of(true);
    }
  }

  private backToLogin() {
    this.authenticationService.resetAuth();
    this.checkAuth = false;
    this.router.navigate([URL_LOGIN]);
  }
}
