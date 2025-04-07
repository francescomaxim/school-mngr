import { Injectable, inject } from '@angular/core';
import { RealtimeDatabaseService } from '../../../../shared/services/realtime-database.service';
import { Course } from './course.model';
import { AppUser } from '../../../../core/authentication/models/user.model';
import { map, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private db = inject(RealtimeDatabaseService<Course>);
  private userDb = inject(RealtimeDatabaseService<AppUser>);
  private coursesCollection = 'courses';
  private usersCollection = 'users';

  getAllCourses(): Observable<Course[]> {
    return this.db.getAll(this.coursesCollection);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return this.db.getById(this.coursesCollection, id);
  }

  addCourse(course: Course): Promise<string> {
    return this.db.add(this.coursesCollection, course);
  }

  updateCourse(id: string, course: Partial<Course>): Promise<void> {
    return this.db.update(this.coursesCollection, id, course);
  }

  deleteCourse(id: string): Promise<void> {
    return this.db.delete(this.coursesCollection, id);
  }

  getCoursesByTeacher(teacherId: string): Observable<Course[]> {
    return this.getAllCourses().pipe(
      map((courses) =>
        courses.filter((course) => course.teacherId === teacherId)
      )
    );
  }

  // ✅ Enroll student to course
  async enrollStudentToCourse(
    studentId: string,
    courseId: string
  ): Promise<void> {
    const user = await firstValueFrom(
      this.userDb.getById(this.usersCollection, studentId)
    );
    if (!user) throw new Error('User not found');

    const enrolledCourses = user.enrolledCourses ?? [];
    if (!enrolledCourses.includes(courseId)) {
      enrolledCourses.push(courseId);
      await this.userDb.update(this.usersCollection, studentId, {
        enrolledCourses,
      });
    }
  }
}
