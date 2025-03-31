import { Injectable, inject } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Assignment, Submission } from './assigment.model';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssignmentFirestoreService {
  private db = inject(FirestoreService<Assignment>);
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

  // ✅ Adăugare submission (student uploads homework)
  async addSubmission(
    assignmentId: string,
    submission: Submission
  ): Promise<void> {
    const current = await this.db
      .getById(this.collection, assignmentId)
      .toPromise();
    const updatedSubmissions = [...(current?.submissions ?? []), submission];
    return this.db.update(this.collection, assignmentId, {
      submissions: updatedSubmissions,
    });
  }
}
