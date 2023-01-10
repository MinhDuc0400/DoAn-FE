import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NbToastrService } from '@nebular/theme';
import { catchError, pluck, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { URL_LOGIN } from '../constants/url.constant';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private toastService: NbToastrService,
    private router: Router
  ) {}

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'x-api-key': environment.firebaseConfig.apiKey,
    });
  }

  getFormHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      'x-api-key': environment.firebaseConfig.apiKey,
    });
  }
  getAPINoPluck<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.getHeaders(),
    })
      .pipe(
        catchError(err => {
          console.log(err.error.status)
          if (err.error.status === 401) {
            this.router.navigate([URL_LOGIN]);
            return;
          }
          this.toastService.danger(err.error.message, 'ERROR');
          return of(err);
        }),
      );
  }

  getAPI<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.getHeaders(),
    })
      .pipe(
        tap(el => console.log(el)),
        pluck('data'),
        catchError(err => {
          console.log(err.error)

          if (err.error.statusCode === 401) {
            this.router.navigate([URL_LOGIN]);
            return;
          }
          this.toastService.danger(err.error.message, 'ERROR');
          return of(err);
        }),
      );
  }

  postAPI<T, K>(url: string, body: K): Observable<T> {
    return this.http.post<T>(url, body, {
      headers: this.getHeaders(),
      observe: 'response', responseType: 'json',

    })
      .pipe(
        pluck('body'),
        pluck('data'),
        catchError(err => {
          console.log(err.error.statusCode)

          if (err.error.statusCode === 401) {
            this.router.navigate([URL_LOGIN]);
            return;
          }
          this.toastService.danger(err.error.message, 'ERROR');
          return of(err);
        }),
      );
  }

  putAPI<T>(url: string, body: T) {
    return this.http.put<T>(url, body, {
      headers: this.getHeaders(),
    })
      .pipe(
        catchError(err => {
          console.log(err.error.statusCode)

          if (err.error.statusCode === 401) {
            this.router.navigate([URL_LOGIN]);
            return;
          }
          this.toastService.danger(err.error.message, 'ERROR');
          return of(err);
        }),
      );
  }

  deleteAPI<T>(url: string) {
    return this.http.delete<T>(url, {
      headers: this.getHeaders(),
    })
      .pipe(
        catchError(err => {
          if (err.error.statusCode === 401) {
            this.router.navigate([URL_LOGIN]);
            return;
          }
          this.toastService.danger(err.error.message, 'ERROR');
          return of(err);
        }),
      );
  }
}
