import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-manage-courses',
  imports: [CommonModule],
  templateUrl: './teacher-manage-courses.component.html',
  styleUrl: './teacher-manage-courses.component.css',
})
export class TeacherManageCoursesComponent {
  courses = [
    {
      id: 'c1',
      title: 'Programare Web',
      description: 'Curs despre HTML, CSS, JS și Angular',
      students: 30,
    },
    {
      id: 'c2',
      title: 'Structuri de Date',
      description: 'Liste, arbori, grafuri și algoritmi',
      students: 28,
    },
    {
      id: 'c3',
      title: 'Rețele de Calculatoare',
      description: 'Bazele rețelelor și protocoalelor',
      students: 25,
    },
  ];

  onAddCourse() {
    // TODO: Deschide modal / redirect către formular adăugare curs
    console.log('Add course');
  }

  onEditCourse(courseId: string) {
    // TODO: Deschide formular de editare curs
    console.log('Edit course:', courseId);
  }

  onViewDetails(courseId: string) {
    // TODO: Redirect către pagina de detalii curs
    console.log('View details for:', courseId);
  }

  onDeleteCourse(courseId: string) {
    // TODO: Confirmare și ștergere curs
    console.log('Delete course:', courseId);
  }
}
