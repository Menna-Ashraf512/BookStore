import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signIn(data: any): Observable<any> {
    return this.httpClient.post(`auth/login`, data);
  }
  register(data: any): Observable<any> {
    return this.httpClient.post(`auth/register`, data);
  }
  forgetPass(email: any): Observable<any> {
    return this.httpClient.post(`auth/forgot-password`, email);
  }
  resetPass(data: any): Observable<any> {
    return this.httpClient.post(`auth/reset-password`, data);
  }
  changePass(data: any): Observable<any> {
    return this.httpClient.post(`auth/change-password`, data);
  }
}
