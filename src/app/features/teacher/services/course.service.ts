import { Injectable, inject } from '@angular/core';
import { RealtimeDatabaseService } from '../../../shared/services/realtime-database.service';
import { Course } from './course.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private db = inject(RealtimeDatabaseService<Course>);
  private collection = 'courses';

  getAllCourses(): Observable<Course[]> {
    return this.db.getAll(this.collection);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return this.db.getById(this.collection, id);
  }

  addCourse(course: Course): Promise<string> {
    return this.db.add(this.collection, course);
  }

  updateCourse(id: string, course: Partial<Course>): Promise<void> {
    return this.db.update(this.collection, id, course);
  }

  deleteCourse(id: string): Promise<void> {
    return this.db.delete(this.collection, id);
  }

  getCoursesByTeacher(teacherId: string): Observable<Course[]> {
    return this.getAllCourses().pipe(
      map((courses) =>
        courses.filter((course) => course.teacherId === teacherId)
      )
    );
  }
}
