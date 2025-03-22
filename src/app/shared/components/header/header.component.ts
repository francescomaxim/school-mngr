import { Component, inject } from '@angular/core';
import { RouterService } from '../../../router.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { CommonModule } from '@angular/common';

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

  //autority

  private auth = inject(AuthService);

  role: 'admin' | 'teacher' | 'student' | null = null;

  constructor() {
    this.auth.user.subscribe((user) => {
      this.role = user?.role ?? null;
    });
  }
}
