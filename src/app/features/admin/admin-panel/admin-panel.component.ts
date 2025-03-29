import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AdminPanelService } from './admin-panel.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  private fb = inject(FormBuilder);
  private adminPanelService = inject(AdminPanelService);
  form: FormGroup;
  errorMessage: string | null = null;

  constructor() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['student', Validators.required],
    });
  }

  createUser() {
    this.errorMessage = null;
    if (this.form.invalid) this.errorMessage = 'Something went wrong ❌';

    const user: {
      fullName: string;
      email: string;
      password: string;
      role: 'teacher' | 'student';
    } = this.form.value;
    this.adminPanelService
      .createUser(user)
      .then(() => {
        this.errorMessage = 'User created successfully ✅';
      })
      .catch((err) => {
        this.errorMessage = 'Something went wrong ❌';
      });
  }
}
