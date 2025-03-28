import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, filter } from 'rxjs/operators';
import { selectUser } from '../../../stores/auth-store/auth.selectors';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    filter((user) => user !== undefined),
    take(1),
    map((user) => {
      if (user?.role === 'admin') {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
