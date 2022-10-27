import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {}

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
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

  getAPI<T>(url: string) {
    return this.http.get<T>(url, {
      headers: this.getHeaders(),
    });
  }

  postAPI<T>(url: string, body: T) {
    return this.http.post<T>(url, body, {
      headers: this.getHeaders(),
    });
  }

  putAPI<T>(url: string, body: T) {
    return this.http.put<T>(url, body, {
      headers: this.getHeaders(),
    });
  }

  deleteAPI<T>(url: string) {
    return this.http.delete<T>(url, {
      headers: this.getHeaders(),
    });
  }
}
