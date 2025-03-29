import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../../core/authentication/auth.service';
import { AdminPanelService } from './admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  private fb = inject(FormBuilder);
  private adminPanelService = inject(AdminPanelService);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['student', Validators.required],
    });
  }

  createUser() {
    if (this.form.invalid) return;

    const user: {
      fullName: string;
      email: string;
      password: string;
      role: 'teacher' | 'student';
    } = this.form.value;
    this.adminPanelService.createUser(user);
  }
}
