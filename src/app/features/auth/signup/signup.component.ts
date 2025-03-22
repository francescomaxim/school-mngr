import { Component, inject } from '@angular/core';
import { RouterService } from '../../../router.service';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private routerService = inject(RouterService);

  goToLogIn() {
    this.routerService.goToLogIn();
  }
}
