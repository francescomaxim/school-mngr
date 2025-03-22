import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private router = inject(Router);

  goToLogIn() {
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
