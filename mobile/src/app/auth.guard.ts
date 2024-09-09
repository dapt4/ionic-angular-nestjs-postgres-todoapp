import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    return true;
  } else {
    const router = new Router()
    router.navigate(['/login']);
    return false;
  }
};
