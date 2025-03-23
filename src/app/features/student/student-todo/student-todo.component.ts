import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  label: string;
  completed: boolean;
}

@Component({
  selector: 'app-student-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-todo.component.html',
  styleUrl: './student-todo.component.css',
})
export class StudentTodoComponent {
  newTask = '';
  tasks: Task[] = [
    { label: 'Trimite tema la Algoritmi', completed: false },
    { label: 'Învață pentru testul la EGC', completed: false },
    { label: 'Participă la cursul de Rețele', completed: true },
  ];

  addTask() {
    if (!this.newTask.trim()) return;

    this.tasks.push({ label: this.newTask.trim(), completed: false });
    this.newTask = '';
  }

  toggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
