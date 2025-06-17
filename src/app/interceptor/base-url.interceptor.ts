import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class baseUrlInterceptor implements HttpInterceptor {

  baseUrl:string='https://upskilling-egypt.com:3007/'
  constructor(){}
  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>>
   {
    const newRequest=req.clone({
      url:this.baseUrl+req.url
    })
    return next.handle(newRequest)
  }

};
