import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ManageUsersService } from './manage-users.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/authentication/models/user.model';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent implements OnInit {
  private manageUsersService = inject(ManageUsersService);

  users = this.manageUsersService.users;

  ngOnInit(): void {
    this.manageUsersService.getAllUsers();
  }

  onEdit(user: User): void {
    console.log('Edit user:', user);
    // TODO: implementare modal/form editare
  }

  onRemove(user: User): void {
    console.log('Remove user:', user);
    //TODO: implementare modal/form stergere
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
