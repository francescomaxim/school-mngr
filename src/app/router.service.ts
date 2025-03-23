import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private router = inject(Router);

  goToLogIn() {
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToAdminPanel() {
    this.router.navigate(['/adminpanel']);
  }

  goToManageUsers() {
    this.router.navigate(['/manage-users']);
  }

  goToReports() {
    this.router.navigate(['/reports']);
  }

  goToTeacherDashBoard() {
    this.router.navigate(['/teacher-dashboard']);
  }

  goToTeacherManageCourses() {
    this.router.navigate(['/teacher-manage-courses']);
  }

  goToTeacherAssigments() {
    this.router.navigate(['/teacher-assigments']);
  }

  goToTeacherAttendance() {
    this.router.navigate(['/teacher-attendance']);
  }

  goToStudentCourses() {
    this.router.navigate(['/student-courses']);
  }

  goToStudentAssigments() {
    this.router.navigate(['/student-assigments']);
  }

  goToStudentAttendance() {
    this.router.navigate(['/student-attendance']);
  }

  goToStudentToDo() {
    this.router.navigate(['/student-todo']);
  }

  goToStudentDashBoard() {
    this.router.navigate(['/student-dashboard']);
  }
}
