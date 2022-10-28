import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NbToastrService } from '@nebular/theme';
import { catchError, pluck } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private toastService: NbToastrService,
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

  getAPI<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.getHeaders(),
    })
      .pipe(
        pluck('data'),
        catchError(err => {
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
        pluck('data'),
        catchError(err => {
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
          this.toastService.danger(err.error.message, 'ERROR');
          return of(err);
        }),
      );
  }
}
