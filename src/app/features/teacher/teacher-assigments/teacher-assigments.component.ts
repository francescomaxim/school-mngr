import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { Assignment } from '../services/assigments/assigment.model';
import { Course } from '../services/courses/course.model';

import { selectAllAssignments } from '../../../stores/assigments-store/assigments.selectors';
import {
  loadAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} from '../../../stores/assigments-store/assigments.actions';
import { selectUser } from '../../../stores/auth-store/auth.selectors';

import { selectAllCourses } from '../../../stores/courses-store/courses.selectors';
import { loadCourses } from '../../../stores/courses-store/courses.actions';

@Component({
  selector: 'app-teacher-assigments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-assigments.component.html',
  styleUrl: './teacher-assigments.component.css',
})
export class TeacherAssigmentsComponent implements OnInit {
  private store = inject(Store);

  assignments$ = this.store.select(selectAllAssignments);
  user = this.store.selectSignal(selectUser);
  allCourses$ = this.store.select(selectAllCourses);

  showAddModal = signal(false);
  assignmentToDelete = signal<Assignment | null>(null);
  selectedAssignment = signal<Assignment | null>(null);
  editMode = signal(false);

  newAssignment = signal<Partial<Assignment>>({
    title: '',
    description: '',
    courseId: '',
    dueDate: '',
  });

  courseMap = new Map<string, string>();

  today = new Date();

  importType = 'image';
  importedFile = signal<File | null>(null);

  ngOnInit(): void {
    this.store.dispatch(loadAssignments());
    this.store.dispatch(loadCourses());

    this.allCourses$.subscribe((courses) => {
      this.courseMap.clear();
      courses.forEach((c) => {
        this.courseMap.set(c.id!, c.title);
      });
    });
  }

  getCourseTitle(courseId: string): string {
    return this.courseMap.get(courseId) ?? 'Unknown';
  }

  get teacherCourses$(): Observable<Course[]> {
    const teacherId = this.user()?.id;
    return this.allCourses$.pipe(
      map((courses) => courses.filter((c) => c.teacherId === teacherId))
    );
  }

  getStatusClass(dueDate: string): string {
    return new Date(dueDate) >= this.today ? 'bg-success' : 'bg-danger';
  }

  getStatusLabel(dueDate: string): string {
    return new Date(dueDate) >= this.today ? 'Active' : 'Closed';
  }

  // Add
  onAddAssignment() {
    this.showAddModal.set(true);
  }

  cancelAdd() {
    this.showAddModal.set(false);
    this.importedFile.set(null);
    this.newAssignment.set({
      title: '',
      description: '',
      dueDate: '',
      courseId: '',
    });
  }

  submitAssignment() {
    const userId = this.user()?.id;
    if (!userId) return;

    const assignment: Assignment = {
      ...this.newAssignment(),
      teacherId: userId,
      createdAt: new Date().toISOString(),
    } as Assignment;

    this.store.dispatch(addAssignment({ assignment }));
    this.cancelAdd();
  }

  // Delete
  confirmDelete(assignment: Assignment) {
    this.assignmentToDelete.set(assignment);
  }

  cancelDelete() {
    this.assignmentToDelete.set(null);
  }

  deleteConfirmed() {
    const id = this.assignmentToDelete()?.id;
    if (id) this.store.dispatch(deleteAssignment({ id }));
    this.cancelDelete();
  }

  // View/Edit
  onView(assignment: Assignment) {
    this.selectedAssignment.set(assignment);
    this.editMode.set(false);
  }

  onEdit(assignment: Assignment) {
    this.selectedAssignment.set({ ...assignment });
    this.editMode.set(true);
  }

  cancelViewEdit() {
    this.selectedAssignment.set(null);
    this.editMode.set(false);
  }

  submitEdit() {
    const assignment = this.selectedAssignment();
    if (!assignment || !assignment.id) return;

    const changes: Partial<Assignment> = {
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      courseId: assignment.courseId,
    };

    this.store.dispatch(updateAssignment({ id: assignment.id, changes }));
    this.cancelViewEdit();
  }

  // Import (în Add Modal)
  handleImportImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      this.importedFile.set(file);
    } else {
      alert('❌ Invalid image file!');
      this.importedFile.set(null);
    }
  }

  handleImportFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (
      file.type === 'application/json' ||
      file.name.endsWith('.json') ||
      file.name.endsWith('.docx')
    ) {
      this.importedFile.set(file);
    } else {
      alert('❌ Invalid file!');
      this.importedFile.set(null);
    }
  }
}
