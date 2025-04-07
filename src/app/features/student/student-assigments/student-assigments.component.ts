import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { selectAllAssignments } from '../../../stores/assigments-store/assigments.selectors';
import { selectAllCourses } from '../../../stores/courses-store/courses.selectors';
import { selectUser } from '../../../stores/auth-store/auth.selectors';
import { UserService } from '../../../core/services/user.service';
import { loadAssignments } from '../../../stores/assigments-store/assigments.actions';
import { loadCourses } from '../../../stores/courses-store/courses.actions';
import { AssignmentUploadService } from '../../../core/services/assigments-upload.service';
import { AssignmentFirestoreService } from '../../services/assigments-firestore.service';
import { Submission } from '../../services/assigment.model';

@Component({
  selector: 'app-student-assigments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-assigments.component.html',
  styleUrl: './student-assigments.component.css',
})
export class StudentAssigmentsComponent implements OnInit {
  private store = inject(Store);
  private userService = inject(UserService);
  private uploadService = inject(AssignmentUploadService);
  private firestoreService = inject(AssignmentFirestoreService);
  authUser = this.store.selectSignal(selectUser);

  private assignmentsSubject = new BehaviorSubject<any[]>([]);
  assignments$ = this.assignmentsSubject.asObservable();

  uploadAssignment = signal<any | null>(null);
  uploadedFile = signal<File | null>(null);

  selectedAssignment = signal<{
    title: string;
    description: string;
    fileUrl?: string;
    courseTitle: string;
  } | null>(null);

  ngOnInit(): void {
    this.store.dispatch(loadAssignments());
    this.store.dispatch(loadCourses());

    const userId = this.authUser()?.id;
    if (!userId) return;

    combineLatest([
      this.store.select(selectAllAssignments),
      this.store.select(selectAllCourses),
      this.userService.getUserById(userId),
    ])
      .pipe(
        map(async ([assignments, courses, user]) => {
          if (!user?.enrolledCourses?.length) return [];

          const enrichedAssignments = await Promise.all(
            assignments
              .filter((a) => user.enrolledCourses?.includes(a.courseId))
              .map(async (a) => {
                const course = courses.find((c) => c.id === a.courseId);
                const dueDate = new Date(a.dueDate);
                const today = new Date();

                const submission = await this.firestoreService.getSubmission(
                  a.id!,
                  user.id
                );

                const status = submission
                  ? 'Trimis'
                  : dueDate < today
                  ? 'Depășit'
                  : 'În așteptare';

                return {
                  id: a.id,
                  title: a.title,
                  description: a.description,
                  course: course?.title ?? 'Necunoscut',
                  deadline: dueDate,
                  status,
                  fileUrl: submission?.fileUrl ?? undefined,
                  grade: submission?.grade ?? null,
                };
              })
          );

          return enrichedAssignments;
        })
      )
      .subscribe(async (promiseResult) => {
        const assignments = await promiseResult;
        this.assignmentsSubject.next(assignments);
      });
  }

  viewDetails(assignment: any) {
    this.selectedAssignment.set({
      title: assignment.title,
      description: assignment.description,
      courseTitle: assignment.course,
      fileUrl: assignment.fileUrl,
    });
  }

  closeDetails() {
    this.selectedAssignment.set(null);
  }

  downloadFile(url: string) {
    window.open(url, '_blank');
  }

  submitAssignment(assignment: any) {
    this.uploadAssignment.set(assignment);
  }

  handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadedFile.set(file);
    }
  }

  cancelUpload() {
    this.uploadAssignment.set(null);
    this.uploadedFile.set(null);
  }

  async confirmUpload() {
    const assignment = this.uploadAssignment();
    const file = this.uploadedFile();
    const studentId = this.authUser()?.id;

    if (!assignment?.id || !file || !studentId) return;

    try {
      const fileUrl = await this.uploadService.uploadAssignmentFile(
        file,
        assignment.id
      );

      const submission: Submission = {
        fileUrl,
        studentId,
        submittedAt: new Date().toISOString(),
      };

      await this.firestoreService.submitAssignmentFile(
        assignment.id,
        studentId,
        submission
      );

      console.log('✅ Fișier încărcat cu succes!');

      // 🔄 Actualizează local assignment-ul cu statusul „Trimis” + fileUrl
      const current = this.assignmentsSubject.getValue();
      const updated = current.map((a) =>
        a.id === assignment.id ? { ...a, status: 'Trimis', fileUrl } : a
      );
      this.assignmentsSubject.next(updated);

      this.cancelUpload();
    } catch (error) {
      console.error('❌ Upload error:', error);
    }
  }
}
