import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl:string=`https://upskilling-egypt.com:3007/api/`;
  const token = localStorage.getItem('userToken');
  
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  const isPublic = publicRoutes.some(route => req.url.startsWith(route));

  const newRequest = req.clone({
    url: baseUrl + req.url,
    setHeaders: !isPublic && token ? {
      authorization: `Bearer ${token}`
    } : {}
  });

  return next(newRequest);
};
