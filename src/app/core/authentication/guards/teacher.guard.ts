import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const teacherGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user.getValue();

  if (user && user.role === 'teacher') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
