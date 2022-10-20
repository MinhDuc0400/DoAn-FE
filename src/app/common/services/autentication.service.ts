import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {
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
