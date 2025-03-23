import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent {
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
}
