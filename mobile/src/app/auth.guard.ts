import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    if (oauthService.hasAccess() ) {
      return true;
    }
    oauthService.login();
    return false;
  };
};
