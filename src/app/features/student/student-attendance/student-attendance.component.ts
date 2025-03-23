import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-attendance',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.css',
})
export class StudentAttendanceComponent {
  selectedCourse = '';
  courses = ['Algoritmi', 'Programare Web', 'Teoria Grafurilor'];

  attendance = [
    { date: new Date('2025-03-01'), course: 'Algoritmi', status: 'Prezent' },
    {
      date: new Date('2025-03-02'),
      course: 'Programare Web',
      status: 'Absent',
    },
    {
      date: new Date('2025-03-03'),
      course: 'Teoria Grafurilor',
      status: 'Prezent',
    },
    { date: new Date('2025-03-04'), course: 'Algoritmi', status: 'Motivat' },
    {
      date: new Date('2025-03-05'),
      course: 'Programare Web',
      status: 'Prezent',
    },
  ];

  filteredAttendance() {
    return this.selectedCourse
      ? this.attendance.filter((a) => a.course === this.selectedCourse)
      : this.attendance;
  }

  getAttendanceRate() {
    const total = this.attendance.length;
    const present = this.attendance.filter(
      (a) => a.status === 'Prezent'
    ).length;
    return total > 0 ? Math.round((present / total) * 100) : 0;
  }

  getAbsenceCount() {
    return this.attendance.filter((a) => a.status === 'Absent').length;
  }

  getMotivatedCount() {
    return this.attendance.filter((a) => a.status === 'Motivat').length;
  }
}
