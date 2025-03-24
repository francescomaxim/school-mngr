import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { AdminPanelComponent } from './features/admin/admin-panel/admin-panel.component';
// import { adminGuard } from './core/authentication/guards/admin.guard';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users.component';
import { TeacherDashboardComponent } from './features/teacher/teacher-dashboard/teacher-dashboard.component';
// import { teacherGuard } from './core/authentication/guards/teacher.guard';
import { TeacherManageCoursesComponent } from './features/teacher/teacher-manage-courses/teacher-manage-courses.component';
import { TeacherAssigmentsComponent } from './features/teacher/teacher-assigments/teacher-assigments.component';
import { TeacherAttendanceComponent } from './features/teacher/teacher-attendance/teacher-attendance.component';
import { StudentDashboardComponent } from './features/student/student-dashboard/student-dashboard.component';
import { StudentCoursesComponent } from './features/student/student-courses/student-courses.component';
import { StudentAssigmentsComponent } from './features/student/student-assigments/student-assigments.component';
import { StudentAttendanceComponent } from './features/student/student-attendance/student-attendance.component';
import { StudentTodoComponent } from './features/student/student-todo/student-todo.component';
// import { studentGuard } from './core/authentication/guards/student.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'adminpanel',
    canActivate: [],
    component: AdminPanelComponent,
  },
  {
    path: 'manage-users',
    canActivate: [],
    component: ManageUsersComponent,
  },
  {
    path: 'teacher-dashboard',
    canActivate: [],
    component: TeacherDashboardComponent,
  },
  {
    path: 'teacher-manage-courses',
    canActivate: [],
    component: TeacherManageCoursesComponent,
  },
  {
    path: 'teacher-assigments',
    canActivate: [],
    component: TeacherAssigmentsComponent,
  },
  {
    path: 'teacher-attendance',
    canActivate: [],
    component: TeacherAttendanceComponent,
  },
  {
    path: 'student-dashboard',
    canActivate: [],
    component: StudentDashboardComponent,
  },
  {
    path: 'student-courses',
    canActivate: [],
    component: StudentCoursesComponent,
  },
  {
    path: 'student-assigments',
    canActivate: [],
    component: StudentAssigmentsComponent,
  },
  {
    path: 'student-attendance',
    canActivate: [],
    component: StudentAttendanceComponent,
  },
  {
    path: 'student-todo',
    canActivate: [],
    component: StudentTodoComponent,
  },
  {
    path: '**',
    component: HeroComponent,
  },
];
