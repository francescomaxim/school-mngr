import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/authentication/auth.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  errorMessage: string | null = null;

  private auth = inject(AuthService);

  login() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    console.log(email, password);

    this.auth
      .login(email!, password!)
      .then((user) => {
        const role = user.role;

        if (role === 'admin') {
          this.router.navigate(['/adminpanel']);
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'This user does not exist.';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password.';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'Invalid email address format.';
            break;
          case 'auth/too-many-requests':
            this.errorMessage =
              'Too many failed attempts. Please try again later.';
            break;
          default:
            this.errorMessage = 'Authentication failed. Please try again.';
            break;
        }
      });
  }
}
