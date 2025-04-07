import { Injectable } from '@angular/core';
import { RealtimeDatabaseService } from '../../shared/services/realtime-database.service';
import { Todo } from './todo.model';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly collectionName = 'todos';

  constructor(private db: RealtimeDatabaseService<Todo>) {}

  getTodosByUser(userId: string): Observable<Todo[]> {
    return this.db
      .getAll(this.collectionName)
      .pipe(map((todos) => todos.filter((todo) => todo.userId === userId)));
  }

  addTodo(todo: Todo): Promise<string> {
    return this.db.add(this.collectionName, todo);
  }

  updateTodo(id: string, changes: Partial<Todo>): Promise<void> {
    return this.db.update(this.collectionName, id, changes);
  }

  deleteTodo(id: string): Promise<void> {
    return this.db.delete(this.collectionName, id);
  }
}
