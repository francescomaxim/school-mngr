import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-attendance',
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-attendance.component.html',
  styleUrl: './teacher-attendance.component.css',
})
export class TeacherAttendanceComponent {
  courses = ['Algortmi', 'Algoritmi', 'Programare'];
  selectedCourse = this.courses[0];
  selectedDate = new Date().toISOString().split('T')[0];

  filterText = '';

  students = [
    { name: 'Andrei Pop', email: 'andrei@example.com', status: 'Present' },
    { name: 'Ioana Radu', email: 'ioana@example.com', status: 'Absent' },
    { name: 'Maria Dinu', email: 'maria@example.com', status: 'Present' },
  ];

  saveAttendance() {
    console.log('Attendance saved:', this.students);
  }

  loadAttendance() {
    console.log('Attendance loaded');
  }

  resetAttendance() {
    this.students = this.students.map((s) => ({ ...s, status: '' }));
  }

  countStatus(status: string): number {
    return this.students.filter((s) => s.status === status).length;
  }
}
