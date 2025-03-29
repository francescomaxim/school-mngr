import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService {
  private authService = inject(AuthService);

  createUser(user: {
    fullName: string;
    email: string;
    password: string;
    role: 'student' | 'teacher';
  }) {
    return this.authService.signup(
      user.email!,
      user.password!,
      user.role as 'student' | 'teacher',
      user.fullName!
    );
  }
}
