import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['student', Validators.required],
    });
  }

  createUser() {
    if (this.form.invalid) return;

    const { fullName, email, password, role } = this.form.value;

    this.auth
      .signup(email!, password!, role as 'student' | 'teacher', fullName!)
      .then(() => {
        this.form.reset({ role: 'student' });
        alert('User created successfully ✅');
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong ❌');
      });
  }
}
