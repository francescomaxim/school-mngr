import { Component, inject } from '@angular/core';
import { RouterService } from '../../../router.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private routerService = inject(RouterService);

  goToHome() {
    this.routerService.goToHome();
  }

  goToLogIn() {
    this.routerService.goToLogIn();
  }

  goToSignUp() {
    this.routerService.goToSignUp();
  }
}
