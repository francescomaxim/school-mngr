import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CoursesService } from '../../features/teacher/services/course.service';
import {
  loadCourses,
  loadCoursesSuccess,
  loadCoursesFailure,
  addCourse,
  addCourseSuccess,
  addCourseFailure,
  deleteCourse,
  deleteCourseSuccess,
  deleteCourseFailure,
  updateCourse,
  updateCourseSuccess,
  updateCourseFailure,
} from './courses.actions';
import { selectUser } from '../auth-store/auth.selectors';
import { catchError, map, switchMap, withLatestFrom, of } from 'rxjs';

@Injectable()
export class CoursesEffects {
  private actions$ = inject(Actions);
  private coursesService = inject(CoursesService);
  private store = inject(Store);

  // Load Courses (doar pentru teacher)
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([_, user]) => {
        if (!user || user.role !== 'teacher') {
          return of(
            loadCoursesFailure({
              error: 'User not authorized or not a teacher',
            })
          );
        }

        return this.coursesService.getCoursesByTeacher(user.id).pipe(
          map((courses) => loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(loadCoursesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  // Add Course
  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCourse),
      switchMap(({ course }) =>
        this.coursesService.addCourse(course).then(
          (id) => addCourseSuccess({ course: { ...course, id } }),
          (error) => addCourseFailure({ error: error.message })
        )
      )
    )
  );

  // Delete Course
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCourse),
      switchMap(({ id }) =>
        this.coursesService.deleteCourse(id).then(
          () => deleteCourseSuccess({ id }),
          (error) => deleteCourseFailure({ error: error.message })
        )
      )
    )
  );

  // Edit Course
  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCourse),
      switchMap(({ courseId, updatedCourse }) =>
        this.coursesService.updateCourse(courseId, updatedCourse).then(
          () => updateCourseSuccess({ courseId, updatedCourse }),
          (error) => updateCourseFailure({ error: error.message })
        )
      )
    )
  );
}
