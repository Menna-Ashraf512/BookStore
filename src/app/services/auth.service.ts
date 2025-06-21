import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signIn(data: any): Observable<any> {
    return this.httpClient.post(`api/auth/login`, data);
  }
  register(data: any): Observable<any> {
    return this.httpClient.post(`api/auth/register`, data);
  }
  forgetPass(email: any): Observable<any> {
    return this.httpClient.post(`api/auth/forgot-password`, email);
  }
  resetPass(data: any): Observable<any> {
    return this.httpClient.post(`api/auth/reset-password`, data);
  }
  changePass(data: any): Observable<any> {
    return this.httpClient.post(`api/auth/change-password`, data);
  }
}
