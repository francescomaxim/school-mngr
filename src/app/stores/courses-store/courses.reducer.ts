import { createReducer, on } from '@ngrx/store';
import { Course } from '../../features/teacher/services/course.model';
import * as CourseActions from './courses.actions';
import { updateCourseSuccess } from './courses.actions';

export interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: any;
}

export const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const coursesReducer = createReducer(
  initialState,

  // Load Courses
  on(CourseActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    loading: false,
    courses,
  })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Course
  on(CourseActions.addCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
  })),

  // Delete Course
  on(CourseActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter((c) => c.id !== id),
  })),

  on(updateCourseSuccess, (state, { courseId, updatedCourse }) => ({
    ...state,
    courses: state.courses.map((course) =>
      course.id === courseId ? { ...course, ...updatedCourse } : course
    ),
  }))
);
