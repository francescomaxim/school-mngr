import { inject, Injectable, signal } from '@angular/core';
import { ExcelService } from '../../../shared/services/excel.service';
import { PdfService } from '../../../shared/services/pdf.service';
import { UserService } from '../../../core/services/user.service';
import { AppUser } from '../../../core/authentication/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ManageUsersService {
  // Services
  private excelService = inject(ExcelService);
  private pdfService = inject(PdfService);
  private userService = inject(UserService);

  // Signal for users
  users = signal<AppUser[]>([]);

  // Export All Users to Excel
  exportUsers(users: AppUser[]) {
    this.excelService.exportMultipleSheets(
      [
        {
          sheetName: 'Users',
          title: '📋 All Users in Classter',
          data: users,
        },
      ],
      'classter-users'
    );
  }

  // Export Emails Only
  exportEmails(users: AppUser[]) {
    const emailsData = users.map((u) => ({ Email: u.email }));
    this.excelService.exportMultipleSheets(
      [
        {
          sheetName: 'Emails',
          title: '📧 Email List',
          data: emailsData,
        },
      ],
      'classter-user-emails'
    );
  }

  // PDF Report
  generatePDFReport(users: AppUser[]) {
    this.pdfService.generateUsersReport(users);
  }

  // Fetch All Users
  getAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  // Update User
  updateUser(userId: string, updatedData: Partial<AppUser>) {
    return this.userService.updateUser(userId, updatedData);
  }

  refreshUsers() {
    this.getAllUsers();
  }
}
