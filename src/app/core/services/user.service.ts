import { Injectable } from '@angular/core';
import { RealtimeDatabaseService } from '../../shared/services/realtime-database.service';
import { AppUser, User } from '../../core/authentication/models/user.model';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly collectionName = 'users';

  constructor(private dbService: RealtimeDatabaseService<AppUser>) {}

  getAllUsers(): Observable<AppUser[]> {
    return this.dbService.getAll(this.collectionName);
  }

  getUserById(id: string): Observable<AppUser | null> {
    return this.dbService
      .getById(this.collectionName, id)
      .pipe(map((user) => user ?? null));
  }

  addUser(user: AppUser): Promise<string> {
    return this.dbService.add(this.collectionName, user);
  }

  updateUser(id: string, user: Partial<AppUser>): Promise<void> {
    return this.dbService.update(this.collectionName, id, user);
  }

  deleteUser(id: string): Promise<void> {
    return this.dbService.delete(this.collectionName, id);
  }

  getUserByIdOnce(id: string): Promise<AppUser | null> {
    return firstValueFrom(this.getUserById(id));
  }
}
