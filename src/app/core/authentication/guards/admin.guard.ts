// import { inject, Injectable } from '@angular/core';
// import {
//   CanActivateFn,
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { AuthService } from '../auth.service';

// export const adminGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   const user = authService.user.getValue();

//   if (user && user.role === 'admin') {
//     return true;
//   }

//   // Redirect dacă nu e admin
//   router.navigate(['/login']);
//   return false;
// };
