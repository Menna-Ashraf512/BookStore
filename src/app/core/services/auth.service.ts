import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuth } from '../../dashboard/interfaces/iauth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // customers test account
  // mennaalla@gmail.com
  // Menna@20

  constructor(private httpClient: HttpClient) {
  }
  storedProfile = typeof window !== 'undefined' ? localStorage.getItem('profile') : null;
  initialProfile = this.storedProfile ? JSON.parse(this.storedProfile) as IAuth : {} as IAuth;

  public profileSubject = new BehaviorSubject<IAuth>(this.initialProfile);


  signIn(data: any): Observable<any> {
    return this.httpClient.post(`User/Login`, data);
  }
  register(data: any): Observable<any> {
    return this.httpClient.post(`User/Register`, data);
  }
  forgetPass(email: any): Observable<any> {
    return this.httpClient.post(`User/ForgotPassword`, email);
  }
  resetPass(data: any): Observable<any> {
    return this.httpClient.post(`User/ResetPassword`, data);
  }
  changePass(data: any): Observable<any> {
    return this.httpClient.post(`User/ChangePassword`, data);
  }
}
