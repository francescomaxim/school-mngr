import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectAllCourses } from '../../../stores/courses-store/courses.selectors';
import { selectUser } from '../../../stores/auth-store/auth.selectors';

import { Course } from '../../teacher/services/courses/course.model';
import { AttendanceService } from '../../services/attendance-status.service';
import { UserService } from '../../../core/services/user.service';
import { AppUser } from '../../../core/authentication/models/user.model';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.css',
})
export class StudentAttendanceComponent implements OnInit {
  private store = inject(Store);
  private userService = inject(UserService);
  private attendanceService = inject(AttendanceService);

  private allCourses$ = this.store.select(selectAllCourses);
  private authStoreUser = this.store.selectSignal(selectUser);

  authUser = signal<AppUser | null>(null);
  courses = signal<Course[]>([]);
  selectedCourseId = signal<string>('');
  attendance = signal<{ date: string; course: string; status: string }[]>([]);

  ngOnInit(): void {
    const storeUser = this.authStoreUser();
    if (!storeUser?.id) return;

    this.userService.getUserById(storeUser.id).subscribe((appUser) => {
      if (!appUser) return;
      this.authUser.set(appUser);

      this.allCourses$.subscribe((allCourses) => {
        const enrolled = allCourses.filter((c) =>
          appUser.enrolledCourses?.includes(c.id!)
        );

        this.courses.set(enrolled);

        if (enrolled.length > 0) {
          const firstCourseId = enrolled[0].id!;
          this.selectedCourseId.set(firstCourseId);
          this.loadAttendance(firstCourseId, appUser.id);
        }
      });
    });
  }

  async loadAttendance(courseId: string, studentId: string) {
    const data = await this.attendanceService.getAttendanceForStudent(
      courseId,
      studentId
    );

    const courseTitle =
      this.courses().find((c) => c.id === courseId)?.title ?? 'Necunoscut';

    const attendanceList = Object.entries(data).map(([date, status]) => ({
      date,
      course: courseTitle,
      status,
    }));

    this.attendance.set(attendanceList);
  }

  onCourseChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const courseId = selectElement.value;
    this.selectedCourseId.set(courseId);

    const studentId = this.authUser()?.id;
    if (studentId) {
      this.loadAttendance(courseId, studentId);
    }
  }

  // Stats
  getAttendanceRate(): number {
    const all = this.attendance();
    const present = all.filter((a) => a.status === 'Present').length;
    return all.length > 0 ? Math.round((present / all.length) * 100) : 0;
  }

  getAbsenceCount(): number {
    return this.attendance().filter((a) => a.status === 'Absent').length;
  }

  getMotivatedCount(): number {
    return this.attendance().filter((a) => a.status === 'Excused').length;
  }

  filteredAttendance() {
    return this.attendance();
  }
}
