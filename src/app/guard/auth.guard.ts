import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('userToken');
    if (token) {
      return true;
    } else {
      _router.navigate(['/auth']);
      return false;
    }
  }

  _router.navigate(['/auth']);
  return false;
};
