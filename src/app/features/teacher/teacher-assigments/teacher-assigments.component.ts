import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-assigments',
  imports: [CommonModule],
  templateUrl: './teacher-assigments.component.html',
  styleUrl: './teacher-assigments.component.css',
})
export class TeacherAssigmentsComponent {
  assignments = [
    {
      title: 'Tema 1 - Recursivitate',
      course: 'Programare',
      dueDate: new Date('2025-04-01'),
      status: 'Active',
    },
    {
      title: 'Tema 2 - Algebra Liniară',
      course: 'Matematică',
      dueDate: new Date('2025-03-20'),
      status: 'Closed',
    },
  ];
}
