import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../stores/auth-store/auth.selectors';
import { Course } from '../services/course.model';
import { CoursesService } from '../services/course.service';
import { TeacherManageCoursesService } from './teacher-manage-courses.service';

@Component({
  selector: 'app-teacher-manage-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-manage-courses.component.html',
})
export class TeacherManageCoursesComponent implements OnInit {
  private teacherManageCoursesService = inject(TeacherManageCoursesService);
  private store = inject(Store);

  // User selectat din store
  user = computed(() => this.store.selectSignal(selectUser)());

  // Cursuri
  courses = this.teacherManageCoursesService.courses;

  // Modal
  showAddCourseModal = signal(false);

  // Formular
  newCourse = signal<Partial<Course>>({
    title: '',
    description: '',
  });

  ngOnInit(): void {
    this.teacherManageCoursesService.fetchCourses();
  }

  onAddCourse() {
    this.showAddCourseModal.set(true);
  }

  closeAddModal() {
    this.showAddCourseModal.set(false);
    this.newCourse.set({ title: '', description: '' });
  }

  submitNewCourse() {
    const course = this.newCourse();
    const teacherId = this.user()?.id;

    if (!course.title || !course.description || !teacherId) return;

    const newCourse: Course = {
      ...course,
      teacherId,
      createdAt: new Date().toISOString(),
    } as Course;

    this.teacherManageCoursesService.addCourse(newCourse).then(() => {
      this.teacherManageCoursesService.fetchCourses();
      this.closeAddModal();
    });
  }

  onEdit(course: Course) {
    console.log('Edit course:', course);
  }

  courseToDelete = signal<Course | null>(null);

  onRemove(course: Course) {
    this.courseToDelete.set(course);
  }

  confirmDeleteCourse() {
    const course = this.courseToDelete();
    if (course?.id) {
      this.teacherManageCoursesService.deleteCourse(course.id).then(() => {
        this.teacherManageCoursesService.fetchCourses();
        this.courseToDelete.set(null);
      });
    }
  }

  cancelDelete() {
    this.courseToDelete.set(null);
  }
}
