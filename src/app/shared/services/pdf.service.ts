import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  generateUsersReport(users: any[]) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(' Users Report - Classter', 14, 20);

    const tableData = users.map((user) => [
      user.fullName,
      user.email,
      user.role,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Full Name', 'Email', 'Role']],
      body: tableData,
    });

    doc.save('users-report.pdf');
  }

  generateSimpleTextReport(title: string, content: string) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 10, 20);
    doc.setFontSize(12);
    doc.text(content, 10, 30);
    doc.save(`${title}.pdf`);
  }
}
