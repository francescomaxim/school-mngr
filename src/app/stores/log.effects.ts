import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, withLatestFrom } from 'rxjs/operators';

import { LoggerService } from '../core/services/logger.service';
import { selectUser } from './auth-store/auth.selectors';

import * as AssignmentActions from './assigments-store/assigments.actions';
import * as CourseActions from './courses-store/courses.actions';
import * as AuthActions from './auth-store/auth.actions';
import { EMPTY, from } from 'rxjs';

@Injectable()
export class LoggerEffects {
  private actions$ = inject(Actions);
  private loggerService = inject(LoggerService);
  private store = inject(Store);

  logAssignmentActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AssignmentActions.addAssignment,
          AssignmentActions.deleteAssignment,
          AssignmentActions.updateAssignment
        ),
        withLatestFrom(this.store.select(selectUser)),
        concatMap(([action, user]) => {
          const userId = user?.id ?? 'anonymous';
          const prefix = '[Assignments]';
          let message = '';

          if (action.type === AssignmentActions.addAssignment.type) {
            message = `A adăugat tema "${action.assignment.title}"`;
          }

          if (action.type === AssignmentActions.deleteAssignment.type) {
            message = `A șters tema cu ID-ul ${action.id}`;
          }

          if (action.type === AssignmentActions.updateAssignment.type) {
            message = `A actualizat tema cu ID-ul ${action.id}`;
          }

          if (!message) return EMPTY;

          return from(this.loggerService.log(userId, prefix, message));
        })
      ),
    { dispatch: false }
  );

  logCourseActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CourseActions.addCourse,
          CourseActions.deleteCourse,
          CourseActions.updateCourse
        ),
        withLatestFrom(this.store.select(selectUser)),
        concatMap(([action, user]) => {
          const userId = user?.id ?? 'anonymous';
          const prefix = '[Courses]';
          let message = '';

          if (action.type === CourseActions.addCourse.type) {
            message = `A adăugat cursul "${action.course.title}"`;
          }

          if (action.type === CourseActions.deleteCourse.type) {
            message = `A șters cursul cu ID-ul ${action.id}`;
          }

          if (action.type === CourseActions.updateCourse.type) {
            message = `A actualizat cursul cu ID-ul ${action.courseId}`;
          }

          if (!message) return [];

          return this.loggerService.log(userId, prefix, message);
        })
      ),
    { dispatch: false }
  );

  logAuthActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login, AuthActions.logout),
        withLatestFrom(this.store.select(selectUser)),
        concatMap(([action, user]) => {
          const userId = user?.id ?? 'anonymous';
          const prefix = '[Auth]';
          let message = '';

          if (action.type === AuthActions.login.type) {
            message = `Utilizatorul s-a logat: ${user?.fullName ?? 'Anonim'}`;
          }

          if (action.type === AuthActions.logout.type) {
            message = 'Utilizatorul s-a delogat';
          }

          if (!message) return [];

          return this.loggerService.log(userId, prefix, message);
        })
      ),
    { dispatch: false }
  );

  logEnrollCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CourseActions.enrollInCourse),
        concatMap((action) => {
          const userId = action.studentId;
          const prefix = '[Enroll]';
          const message = `S-a înscris la cursul cu ID-ul ${action.courseId}`;

          return this.loggerService.log(userId, prefix, message);
        })
      ),
    { dispatch: false }
  );
}
