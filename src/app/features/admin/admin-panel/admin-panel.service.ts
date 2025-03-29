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
    this.authService
      .signup(
        user.email!,
        user.password!,
        user.role as 'student' | 'teacher',
        user.fullName!
      )
      .then(() => {
        alert('User created successfully ✅');
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong ❌');
      });
  }
}
