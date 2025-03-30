import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Course } from '../services/courses/course.model';
import {
  loadCourses,
  addCourse,
  deleteCourse,
  updateCourse,
} from '../../../stores/courses-store/courses.actions';
import { selectAllCourses } from '../../../stores/courses-store/courses.selectors';
import { selectUser } from '../../../stores/auth-store/auth.selectors';

@Component({
  selector: 'app-teacher-manage-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-manage-courses.component.html',
})
export class TeacherManageCoursesComponent implements OnInit {
  private store = inject(Store);

  // Courses Observable
  courses$: Observable<Course[]> = this.store.select(selectAllCourses);

  // Modal state
  showAddCourseModal = false;
  showDeleteModal = false;

  // Form model
  newCourse: Partial<Course> = {
    title: '',
    description: '',
  };

  courseToDelete: Course | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }

  // add
  onAddCourse() {
    this.showAddCourseModal = true;
  }

  closeAddModal() {
    this.showAddCourseModal = false;
    this.newCourse = { title: '', description: '' };
  }

  submitNewCourse() {
    if (!this.newCourse.title || !this.newCourse.description) return;

    const teacherId = this.store.selectSignal(selectUser)()?.id ?? 'unknown';

    const course: Course = {
      ...this.newCourse,
      teacherId: teacherId,
      createdAt: new Date().toISOString(),
    } as Course;

    this.store.dispatch(addCourse({ course }));
    this.closeAddModal();
  }

  // Delete

  confirmRemove(course: Course) {
    this.courseToDelete = course;
    this.showDeleteModal = true;
  }

  cancelRemove() {
    this.courseToDelete = null;
    this.showDeleteModal = false;
  }

  removeConfirmed() {
    if (this.courseToDelete?.id) {
      this.store.dispatch(deleteCourse({ id: this.courseToDelete.id }));
    }
    this.cancelRemove();
  }

  //edit
  showEditCourseModal = false;
  courseBeingEdited: Course | null = null;
  editedCourse: Partial<Course> = {};

  onEdit(course: Course) {
    this.courseBeingEdited = course;
    this.editedCourse = {
      title: course.title,
      description: course.description,
    };
    this.showEditCourseModal = true;
  }

  closeEditModal() {
    this.courseBeingEdited = null;
    this.editedCourse = {};
    this.showEditCourseModal = false;
  }

  submitEditCourse() {
    if (
      !this.courseBeingEdited?.id ||
      !this.editedCourse.title ||
      !this.editedCourse.description
    )
      return;

    this.store.dispatch(
      updateCourse({
        courseId: this.courseBeingEdited.id,
        updatedCourse: this.editedCourse,
      })
    );

    this.closeEditModal();
  }
}
