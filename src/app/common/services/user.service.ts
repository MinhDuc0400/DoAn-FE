import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from '../interfaces/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = environment.serverURL + environment.user;
  public currentUser = new BehaviorSubject<CurrentUser>(null);
  constructor(
    private apiService: ApiService,
  ) { }

  getDisplayName(firstName: string, lastName: string): string {
    return (firstName || '') + ' ' + (lastName || '');
  }

  checkUser() {
    return this.apiService.getAPI<CurrentUser>(this.url + '/profile')
      .pipe(
        tap(el => el && this.currentUser.next(el)),
      );
  }
}
