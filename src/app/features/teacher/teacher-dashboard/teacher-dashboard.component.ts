import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent {
  courses = [
    { title: 'Programare', studentCount: 32 },
    { title: 'Matematică', studentCount: 28 },
    { title: 'Algoritmi', studentCount: 30 },
  ];
}
