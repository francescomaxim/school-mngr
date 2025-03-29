import { inject, Injectable, signal } from '@angular/core';
import { ExcelService } from '../../../shared/services/excel.service';
import { PdfService } from '../../../shared/services/pdf.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/authentication/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ManageUsersService {
  // pdf and excel services
  private excelService = inject(ExcelService);
  private pdfService = inject(PdfService);

  exportUsers(users: any[]) {
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

  exportEmails(users: any[]) {
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
  generatePDFReport(users: any[]) {
    this.pdfService.generateUsersReport(users);
  }

  // user service

  private userService = inject(UserService);
  users = signal<User[]>([]);

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }
}
