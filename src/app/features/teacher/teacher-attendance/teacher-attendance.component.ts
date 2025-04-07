import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';

import { selectUser } from '../../../stores/auth-store/auth.selectors';
import { selectAllCourses } from '../../../stores/courses-store/courses.selectors';

import { Course } from '../services/courses/course.model';
import { UserService } from '../../../core/services/user.service';
import { AttendanceService } from '../../services/attendance-status.service';

@Component({
  selector: 'app-teacher-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-attendance.component.html',
  styleUrl: './teacher-attendance.component.css',
})
export class TeacherAttendanceComponent implements OnInit {
  private store = inject(Store);
  private userService = inject(UserService);
  private attendanceService = inject(AttendanceService);

  authUser = this.store.selectSignal(selectUser);
  allCourses$ = this.store.select(selectAllCourses);

  teacherCourses$!: Observable<Course[]>;

  selectedCourseId = signal<string | null>(null);
  selectedDate = signal(new Date().toISOString().split('T')[0]);
  selectedDateValue = this.selectedDate();

  onDateChange() {
    this.selectedDate.set(this.selectedDateValue);
    this.loadAttendance();
  }

  students = signal<
    { id: string; name: string; email: string; status: string }[]
  >([]);
  filterText = signal<string>('');

  ngOnInit(): void {
    this.teacherCourses$ = this.allCourses$.pipe(
      map((courses) =>
        courses.filter((c) => c.teacherId === this.authUser()?.id)
      )
    );
  }

  onCourseChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.loadStudents(value);
  }

  loadStudents(courseId: string) {
    this.selectedCourseId.set(courseId);

    this.userService.getAllUsers().subscribe((users) => {
      const filtered = users.filter((u) =>
        u.enrolledCourses?.includes(courseId)
      );

      const studentList = filtered.map((u) => ({
        id: u.id,
        name: u.fullName,
        email: u.email,
        status: '',
      }));

      this.students.set(studentList);

      this.loadAttendance(); // auto-load attendance după ce am student list
    });
  }

  loadAttendance() {
    const courseId = this.selectedCourseId();
    const date = this.selectedDate();

    if (!courseId) return;

    this.attendanceService.getAttendance(courseId, date).subscribe((data) => {
      const updated = this.students().map((s) => ({
        ...s,
        status: data?.[s.id] ?? '',
      }));
      this.students.set(updated);
    });
  }

  saveAttendance() {
    const courseId = this.selectedCourseId();
    const date = this.selectedDate();
    if (!courseId) return;

    const data: Record<string, string> = {};
    this.students().forEach((s) => {
      data[s.id] = s.status;
    });

    this.attendanceService.saveAttendance(courseId, date, data).then(() => {
      console.log('✅ Attendance saved');
    });
  }

  resetAttendance() {
    this.students.set(this.students().map((s) => ({ ...s, status: '' })));
  }

  countStatus(status: string): number {
    return this.students().filter((s) => s.status === status).length;
  }

  get filteredStudents() {
    const filter = this.filterText().toLowerCase();
    return this.students().filter((s) => s.name.toLowerCase().includes(filter));
  }
}
