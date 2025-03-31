import { createAction, props } from '@ngrx/store';
import { Assignment } from '../../features/teacher/services/assigments/assigment.model';

// Load
export const loadAssignments = createAction('[Assignments] Load Assignments');
export const loadAssignmentsSuccess = createAction(
  '[Assignments] Load Assignments Success',
  props<{ assignments: Assignment[] }>()
);
export const loadAssignmentsFailure = createAction(
  '[Assignments] Load Assignments Failure',
  props<{ error: any }>()
);

// Add
export const addAssignment = createAction(
  '[Assignments] Add Assignment',
  props<{ assignment: Assignment }>()
);
export const addAssignmentSuccess = createAction(
  '[Assignments] Add Assignment Success',
  props<{ assignment: Assignment }>()
);
export const addAssignmentFailure = createAction(
  '[Assignments] Add Assignment Failure',
  props<{ error: any }>()
);

// Delete
export const deleteAssignment = createAction(
  '[Assignments] Delete Assignment',
  props<{ id: string }>()
);
export const deleteAssignmentSuccess = createAction(
  '[Assignments] Delete Assignment Success',
  props<{ id: string }>()
);
export const deleteAssignmentFailure = createAction(
  '[Assignments] Delete Assignment Failure',
  props<{ error: any }>()
);
export const updateAssignment = createAction(
  '[Assignments] Update Assignment',
  props<{ id: string; changes: Partial<Assignment> }>()
);
