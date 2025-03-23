import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-courses',
  imports: [CommonModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent {
  courses = [
    {
      id: '1',
      title: 'Algoritmi și Structuri de Date',
      description: 'Introducere în algoritmi și analiza complexității.',
      teacher: 'Prof. Andrei Pop',
      assignmentsCount: 4,
      attendance: 92,
    },
    {
      id: '2',
      title: 'Programare Web',
      description: 'HTML, CSS, JavaScript și Framework-uri moderne.',
      teacher: 'Prof. Maria Radu',
      assignmentsCount: 2,
      attendance: 85,
    },
  ];

  goToDetails(courseId: string) {
    // Navighează către pagina cu detalii
  }

  goToAssignments(courseId: string) {
    // Navighează către temele cursului
  }
}
