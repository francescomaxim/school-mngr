import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../stores/auth-store/auth.selectors';
import { TodoService } from '../../services/to-do.service';
import { Todo } from '../../services/todo.model';

@Component({
  selector: 'app-student-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-todo.component.html',
  styleUrl: './student-todo.component.css',
})
export class StudentTodoComponent implements OnInit {
  private todoService = inject(TodoService);
  private store = inject(Store);

  newTask = '';
  tasks: Todo[] = [];
  userId = '';

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.loadTasks();
      }
    });
  }

  loadTasks() {
    this.todoService.getTodosByUser(this.userId).subscribe((todos) => {
      this.tasks = todos;
    });
  }

  addTask() {
    const trimmed = this.newTask.trim();
    if (!trimmed) return;

    const todo: Todo = {
      userId: this.userId,
      label: trimmed,
      completed: false,
    };

    this.todoService.addTodo(todo).then(() => {
      this.newTask = '';
      this.loadTasks(); // opțional: poți actualiza doar local dacă vrei
    });
  }

  toggleComplete(task: Todo) {
    if (!task.id) return;
    this.todoService.deleteTodo(task.id).then(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  removeTask(todo: Todo) {
    if (!todo?.id) return;
    this.todoService.deleteTodo(todo.id);
  }
}
