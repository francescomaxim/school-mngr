import { Injectable } from '@angular/core';
import { RealtimeDatabaseService } from '../../shared/services/realtime-database.service';
import { User } from '../../core/authentication/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly collectionName = 'users';

  constructor(private dbService: RealtimeDatabaseService<User>) {}

  getAllUsers(): Observable<User[]> {
    return this.dbService.getAll(this.collectionName);
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.dbService.getById(this.collectionName, id);
  }

  addUser(user: User): Promise<string> {
    return this.dbService.add(this.collectionName, user);
  }

  updateUser(id: string, user: Partial<User>): Promise<void> {
    return this.dbService.update(this.collectionName, id, user);
  }

  deleteUser(id: string): Promise<void> {
    return this.dbService.delete(this.collectionName, id);
  }
}
