import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Assignment, Submission } from './assigment.model';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssignmentFirestoreService {
  private db = inject(FirestoreService<Assignment>);
  private firestore = inject(Firestore); // ✅ injectăm Firestore corect
  private collection = 'assignments';

  getAll(): Observable<Assignment[]> {
    return this.db.getAll(this.collection);
  }

  getById(id: string): Observable<Assignment | undefined> {
    return this.db.getById(this.collection, id);
  }

  add(assignment: Assignment): Promise<string> {
    return this.db.add(this.collection, assignment);
  }

  update(id: string, assignment: Partial<Assignment>): Promise<void> {
    return this.db.update(this.collection, id, assignment);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.collection, id);
  }

  getByTeacher(teacherId: string): Observable<Assignment[]> {
    return this.db.queryByField(this.collection, 'teacherId', teacherId);
  }

  getByCourse(courseId: string): Observable<Assignment[]> {
    return this.db.queryByField(this.collection, 'courseId', courseId);
  }

  getByStudent(studentId: string): Observable<Assignment[]> {
    return this.getAll().pipe(
      map((assignments) =>
        assignments.filter((a) =>
          a.submissions?.some((s) => s.studentId === studentId)
        )
      )
    );
  }

  getDueAssignments(courseId: string): Observable<Assignment[]> {
    return this.getByCourse(courseId).pipe(
      map((assignments) =>
        assignments.filter((a) => new Date(a.dueDate) > new Date())
      )
    );
  }

  async addSubmission(
    assignmentId: string,
    submission: Submission
  ): Promise<void> {
    const current = await this.db
      .getById(this.collection, assignmentId)
      .toPromise();

    if (!current) {
      throw new Error(`Assignment with ID ${assignmentId} does not exist.`);
    }

    const updatedSubmissions = [...(current.submissions ?? []), submission];

    return this.db.update(this.collection, assignmentId, {
      submissions: updatedSubmissions,
    });
  }

  async submitAssignmentFile(
    assignmentId: string,
    studentId: string,
    submission: Submission
  ): Promise<void> {
    const path = `submissions/${assignmentId}/students/${studentId}`;
    return this.db.set(path, submission);
  }

  async getSubmissionsForAssignment(
    assignmentId: string
  ): Promise<Submission[]> {
    const path = `submissions/${assignmentId}/students`;
    const colRef = collection(this.firestore, path);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => doc.data() as Submission);
  }

  async getSubmission(
    assignmentId: string,
    studentId: string
  ): Promise<Submission | null> {
    const path = `submissions/${assignmentId}/students/${studentId}`;
    return this.db.getDocument(path);
  }

  async gradeSubmission(
    assignmentId: string,
    studentId: string,
    grade: number
  ): Promise<void> {
    const path = `submissions/${assignmentId}/students`;
    return this.db.update(path, studentId, { grade });
  }
}
