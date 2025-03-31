import { createReducer, on } from '@ngrx/store';
import { Assignment } from '../../features/teacher/services/assigments/assigment.model';
import * as AssignmentActions from './assigments.actions';
import { updateAssignment } from './assigments.actions';

export interface AssignmentsState {
  assignments: Assignment[];
  loading: boolean;
  error: any;
}

export const initialState: AssignmentsState = {
  assignments: [],
  loading: false,
  error: null,
};

export const assignmentsReducer = createReducer(
  initialState,

  on(AssignmentActions.loadAssignments, (state) => ({
    ...state,
    loading: true,
  })),
  on(AssignmentActions.loadAssignmentsSuccess, (state, { assignments }) => ({
    ...state,
    loading: false,
    assignments,
  })),
  on(AssignmentActions.loadAssignmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AssignmentActions.addAssignmentSuccess, (state, { assignment }) => ({
    ...state,
    assignments: [...state.assignments, assignment],
  })),
  on(AssignmentActions.deleteAssignmentSuccess, (state, { id }) => ({
    ...state,
    assignments: state.assignments.filter((a) => a.id !== id),
  })),
  on(updateAssignment, (state, { id, changes }) => ({
    ...state,
    assignments: state.assignments.map((a) =>
      a.id === id ? { ...a, ...changes } : a
    ),
  }))
);
