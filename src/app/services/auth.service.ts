import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  signIn(data:any):Observable<any>{
    return this.httpClient.post(`api/auth/login`,data)
  }
  register(data:any):Observable<any>{
    return this.httpClient.post(`api/auth/register`,data)
  }
}
