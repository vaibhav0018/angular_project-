import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) {
    // During SSR: don't block — let client-side Angular decide after hydration
    return true;
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
