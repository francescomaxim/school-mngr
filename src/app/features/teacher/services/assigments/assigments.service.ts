import { Injectable, inject } from '@angular/core';
import { RealtimeDatabaseService } from '../../../../shared/services/realtime-database.service';
import { Assignment } from './assigment.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private db = inject(RealtimeDatabaseService<Assignment>);
  private collectionName = 'assignments';

  getAll(): Observable<Assignment[]> {
    return this.db.getAll(this.collectionName);
  }

  getById(id: string): Observable<Assignment | undefined> {
    return this.db.getById(this.collectionName, id);
  }

  add(assignment: Assignment): Promise<string> {
    return this.db.add(this.collectionName, assignment);
  }

  update(id: string, assignment: Partial<Assignment>): Promise<void> {
    return this.db.update(this.collectionName, id, assignment);
  }

  delete(id: string): Promise<void> {
    console.log('🗑️ Ștergere assignment în Firebase:', id);
    return this.db.delete(this.collectionName, id);
  }

  getByCourse(courseId: string): Observable<Assignment[]> {
    return this.getAll().pipe(
      map((assignments) => assignments.filter((a) => a.courseId === courseId))
    );
  }

  getByTeacher(teacherId: string): Observable<Assignment[]> {
    return this.getAll().pipe(
      map((assignments) => assignments.filter((a) => a.teacherId === teacherId))
    );
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
}
