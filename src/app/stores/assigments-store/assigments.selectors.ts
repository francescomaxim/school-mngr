import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssignmentsState } from './assigments.reducer';

export const selectAssignmentsState =
  createFeatureSelector<AssignmentsState>('assignments');

export const selectAllAssignments = createSelector(
  selectAssignmentsState,
  (state) => state.assignments
);

export const selectAssignmentsLoading = createSelector(
  selectAssignmentsState,
  (state) => state.loading
);

export const selectAssignmentsError = createSelector(
  selectAssignmentsState,
  (state) => state.error
);
