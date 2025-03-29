import { inject, Injectable } from '@angular/core';
import { ExcelService } from '../../../shared/services/excel.service';
import { PdfService } from '../../../shared/services/pdf.service';

@Injectable({
  providedIn: 'root',
})
export class ManageUsersService {
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
}
