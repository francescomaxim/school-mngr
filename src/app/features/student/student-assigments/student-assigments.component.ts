import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-assigments',
  imports: [CommonModule],
  templateUrl: './student-assigments.component.html',
  styleUrl: './student-assigments.component.css',
})
export class StudentAssigmentsComponent {
  assignments = [
    {
      course: 'Algoritmi',
      title: 'Tema 1 - Recursivitate',
      deadline: new Date('2025-03-28'),
      status: 'În așteptare',
    },
    {
      course: 'Programare Web',
      title: 'Tema 2 - Angular Forms',
      deadline: new Date('2025-03-25'),
      status: 'Trimis',
    },
    {
      course: 'Teoria Grafurilor',
      title: 'Tema 1 - BFS & DFS',
      deadline: new Date('2025-03-20'),
      status: 'Depășit',
    },
  ];

  viewDetails(assignment: any) {
    // Deschide un modal sau navighează la detalii
  }

  submitAssignment(assignment: any) {
    // Deschide un form / file upload
  }
}
