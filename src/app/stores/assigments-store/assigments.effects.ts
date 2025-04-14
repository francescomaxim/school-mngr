import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AssignmentActions from './assigments.actions';
import { AssignmentService } from '../../features/teacher/services/assigments/assigments.service';
import { catchError, concatMap, from, map, mergeMap, of } from 'rxjs';
import { updateAssignment } from './assigments.actions';

@Injectable()
export class AssignmentsEffects {
  private actions$ = inject(Actions);
  private assignmentService = inject(AssignmentService);

  loadAssignments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignmentActions.loadAssignments),
      mergeMap(() =>
        this.assignmentService.getAll().pipe(
          map((assignments) =>
            AssignmentActions.loadAssignmentsSuccess({ assignments })
          ),
          catchError((error) =>
            of(AssignmentActions.loadAssignmentsFailure({ error }))
          )
        )
      )
    )
  );

  addAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignmentActions.addAssignment),
      mergeMap(({ assignment }) =>
        this.assignmentService
          .add(assignment)
          .then((id) => ({
            ...assignment,
            id,
          }))
          .then((assignmentWithId) =>
            AssignmentActions.addAssignmentSuccess({
              assignment: assignmentWithId,
            })
          )
          .catch((error) => AssignmentActions.addAssignmentFailure({ error }))
      )
    )
  );

  deleteAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignmentActions.deleteAssignment),
      mergeMap(({ id }) =>
        this.assignmentService
          .delete(id)
          .then(() => AssignmentActions.deleteAssignmentSuccess({ id }))
          .catch((error) =>
            AssignmentActions.deleteAssignmentFailure({ error })
          )
      )
    )
  );

  updateAssignment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAssignment),
      mergeMap(({ id, changes }) =>
        from(this.assignmentService.update(id, changes)).pipe(
          map(() => ({ type: '[Assignments] Update Assignment Success' })),
          catchError(() =>
            of({ type: '[Assignments] Update Assignment Failure' })
          )
        )
      )
    )
  );
}
