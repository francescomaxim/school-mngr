import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { Course } from '../../teacher/services/courses/course.model';
import { selectAllCourses } from '../../../stores/courses-store/courses.selectors';
import { selectUser } from '../../../stores/auth-store/auth.selectors';
import { loadCourses } from '../../../stores/courses-store/courses.actions';
import { UserService } from '../../../core/services/user.service';
import { AppUser } from '../../../core/authentication/models/user.model';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent implements OnInit {
  private store = inject(Store);
  private userService = inject(UserService);
  authUser = this.store.selectSignal(selectUser);
  showAvailableCourses = signal(false);

  allCourses$ = this.store.select(selectAllCourses);
  enrolledCourses$!: Observable<(Course & { teacherName: string })[]>;
  availableCourses$!: Observable<(Course & { teacherName: string })[]>;
  appUser: AppUser | null = null;
  teacherMap = new Map<string, string>();
  loadingCourseId = signal<string | null>(null);

  ngOnInit(): void {
    this.store.dispatch(loadCourses());

    const userId = this.authUser()?.id;
    if (!userId) return;

    this.userService.getUserById(userId).subscribe((user) => {
      if (!user) return;
      this.appUser = user;

      this.userService.getAllUsers().subscribe((users) => {
        users
          .filter((u) => u.role === 'teacher')
          .forEach((t) => this.teacherMap.set(t.id, t.fullName));

        this.enrolledCourses$ = this.allCourses$.pipe(
          map((courses) =>
            courses
              .filter((c) => user.enrolledCourses?.includes(c.id!))
              .map((c) => ({
                ...c,
                teacherName: this.teacherMap.get(c.teacherId) || 'Necunoscut',
              }))
          )
        );

        this.availableCourses$ = this.allCourses$.pipe(
          map((courses) =>
            courses
              .filter((c) => !user.enrolledCourses?.includes(c.id!))
              .map((c) => ({
                ...c,
                teacherName: this.teacherMap.get(c.teacherId) || 'Necunoscut',
              }))
          )
        );
      });
    });
  }

  onEnroll(courseId: string) {
    const userId = this.authUser()?.id;
    if (!userId || !this.appUser) return;

    const updatedCourses = [...(this.appUser.enrolledCourses || []), courseId];
    this.loadingCourseId.set(courseId);

    this.userService
      .updateUser(userId, { enrolledCourses: updatedCourses })
      .then(() => {
        this.appUser!.enrolledCourses = updatedCourses;
        this.ngOnInit();
        this.loadingCourseId.set(null);
      });
  }

  goToDetails(courseId: string) {
    // Navigare către pagina de detalii
  }

  goToAssignments(courseId: string) {
    // Navigare către pagina de assignments
  }

  toggleAvailableCourses() {
    this.showAvailableCourses.update((prev) => !prev);
  }
}
