import { inject, Injectable, signal } from '@angular/core';
import { CoursesService } from '../services/course.service';
import { Course } from '../services/course.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherManageCoursesService {
  //courses
  private coursesService = inject(CoursesService);
  courses = signal<Course[]>([]);

  fetchCourses() {
    this.coursesService.getAllCourses().subscribe((data) => {
      this.courses.set(data);
    });
  }

  addCourse(course: Course) {
    return this.coursesService.addCourse(course);
  }

  deleteCourse(courseId: string) {
    return this.coursesService.deleteCourse(courseId);
  }
}
