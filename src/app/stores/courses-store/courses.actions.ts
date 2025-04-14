import { createAction, props } from '@ngrx/store';
import { Course } from '../../features/teacher/services/courses/course.model';

// Load
export const loadCourses = createAction('[Courses] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);

// Add
export const addCourse = createAction(
  '[Courses] Add Course',
  props<{ course: Course }>()
);
export const addCourseSuccess = createAction(
  '[Courses] Add Course Success',
  props<{ course: Course }>()
);
export const addCourseFailure = createAction(
  '[Courses] Add Course Failure',
  props<{ error: any }>()
);

// Delete
export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: string }>()
);
export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ id: string }>()
);
export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: any }>()
);

// Edit (Update)
export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ courseId: string; updatedCourse: Partial<Course> }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ courseId: string; updatedCourse: Partial<Course> }>()
);

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: string }>()
);

export const enrollInCourse = createAction(
  '[Student] Enroll In Course',
  props<{ studentId: string; courseId: string }>()
);

export const enrollInCourseSuccess = createAction(
  '[Student] Enroll In Course Success'
);

export const enrollInCourseFailure = createAction(
  '[Student] Enroll In Course Failure',
  props<{ error: any }>()
);
