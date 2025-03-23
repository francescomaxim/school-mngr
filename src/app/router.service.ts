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

  goToAdminPanel() {
    this.router.navigate(['/adminpanel']);
  }

  goToManageUsers() {
    this.router.navigate(['/manage-users']);
  }

  goToReports() {
    this.router.navigate(['/reports']);
  }
}
