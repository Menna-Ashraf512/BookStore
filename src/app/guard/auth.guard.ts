import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token= localStorage.getItem('userToken')
  const _router= inject(Router)
  if(token){
    return true
  }else{
    _router.navigate(['/auth'])
    return false;
  }
};
