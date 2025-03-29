import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ManageUsersService } from './manage-users.service';
import { AppUser, User } from '../../../core/authentication/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent implements OnInit {
  private manageUsersService = inject(ManageUsersService);

  users = this.manageUsersService.users;

  editingUser: AppUser | null = null;
  updatedFullName = '';
  updatedRole: 'admin' | 'teacher' | 'student' = 'student';

  ngOnInit(): void {
    this.manageUsersService.getAllUsers();
  }

  onEdit(user: AppUser): void {
    this.editingUser = { ...user };
    this.updatedFullName = user.fullName;
    this.updatedRole = user.role;
  }

  onSaveEdit(): void {
    if (!this.editingUser) return;

    const updatedUser: Partial<User> = {
      fullName: this.updatedFullName,
      role: this.updatedRole,
    };

    this.manageUsersService
      .updateUser(this.editingUser.id, updatedUser)
      .then(() => {
        this.editingUser = null;
        this.manageUsersService.getAllUsers(); // Refresh
      });
  }

  cancelEdit(): void {
    this.editingUser = null;
  }

  exportUsers(): void {
    this.manageUsersService.exportUsers(this.users());
  }

  exportEmails(): void {
    this.manageUsersService.exportEmails(this.users());
  }

  generatePDFReport(): void {
    this.manageUsersService.generatePDFReport(this.users());
  }
}
