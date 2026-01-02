import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const customerGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let _authService = inject(AuthService);
  const id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    const profile = _authService.profileSubject.getValue();
    console.log(profile);
    const userRole = profile.role;
    if (userRole === 'Student') {
      return true;
    } else {
      _router.navigate(['/LogIn']);
      return false;
    }
  } else {
    return false;
  }
};
