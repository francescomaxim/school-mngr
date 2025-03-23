import { Component, inject } from '@angular/core';
import { RouterService } from '../../../router.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/authentication/models/user.model';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  //routing
  private routerService = inject(RouterService);

  goToHome() {
    this.routerService.goToHome();
  }

  goToLogIn() {
    this.routerService.goToLogIn();
  }

  goToAdminPanel() {
    this.routerService.goToAdminPanel();
  }

  goToManageUsers() {
    this.routerService.goToManageUsers();
  }

  goToReports() {
    this.routerService.goToReports();
  }

  //autority

  private auth = inject(AuthService);

  user: User | null = null;
  role: 'admin' | 'teacher' | 'student' | null = null;

  constructor() {
    this.auth.user.subscribe((u) => {
      this.user = u;
      this.role = u?.role ?? null;
    });
  }

  logout() {
    this.auth.logout();
  }
}
