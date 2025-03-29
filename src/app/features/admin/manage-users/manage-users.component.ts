import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';
import { ExcelService } from '../../../core/excel/excel.service';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent {
  private excelService = inject(ExcelService);
  private db = inject(Database);
  users: any[] = [];

  ngOnInit() {
    const usersRef = ref(this.db, 'users');
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.users = Object.values(data); // convertim obiectul într-un array
      }
    });
  }

  onEdit(user: any) {
    // TODO: Deschide un modal sau redirecționează către form de editare
    console.log('Edit user:', user);
  }

  onRemove(user: any) {
    const confirmed = confirm(
      `Are you sure you want to remove ${user.fullName}?`
    );
    if (confirmed) {
      // TODO: apel spre service pentru remove
      console.log('Removing user:', user);
    }
  }

  exportUsers() {
    this.excelService.exportMultipleSheets(
      [
        {
          sheetName: 'Users',
          title: '📋 All Users in Classter',
          data: this.users,
        },
      ],
      'classter-users'
    );
  }

  exportEmails() {
    const emailsData = this.users.map((u) => ({ Email: u.email }));
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
}
