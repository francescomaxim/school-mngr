import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {
  studentName = 'Andrei Pop';
  courses = [
    { title: 'Programare', assignments: 2, attendance: '80%' },
    { title: 'Algoritmi', assignments: 1, attendance: '92%' },
    { title: 'Matematică', assignments: 0, attendance: '100%' },
  ];
  toDoList = [
    'Trimite tema la Programare',
    'Participă la cursul de Algoritmi',
    'Verifică notele la Matematică',
  ];
}
