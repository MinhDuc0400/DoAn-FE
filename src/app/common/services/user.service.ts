import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = environment.serverURL + environment.user;
  public currentUser = new BehaviorSubject<User>(null);
  constructor(
    private apiService: ApiService,
  ) { }

  getDisplayName(firstName: string, lastName: string): string {
    return (firstName || '') + ' ' + (lastName || '');
  }

  checkUser() {
    return this.apiService.getAPI<User>(this.url + '/profile')
      .pipe(
        tap(el => {
          if (el) {
            this.currentUser.next(el);
            localStorage.setItem('userType', el.userType);
          }
        }),
      );
  }
}
