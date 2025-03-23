import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { AdminPanelComponent } from './features/admin/admin-panel/admin-panel.component';
import { adminGuard } from './core/authentication/guards/admin.guard';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users.component';
import { TeacherDashboardComponent } from './features/teacher/teacher-dashboard/teacher-dashboard.component';
import { teacherGuard } from './core/authentication/guards/teacher.guard';
import { TeacherManageCoursesComponent } from './features/teacher/teacher-manage-courses/teacher-manage-courses.component';
import { TeacherAssigmentsComponent } from './features/teacher/teacher-assigments/teacher-assigments.component';
import { TeacherAttendanceComponent } from './features/teacher/teacher-attendance/teacher-attendance.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'adminpanel',
    canActivate: [adminGuard],
    component: AdminPanelComponent,
  },
  {
    path: 'manage-users',
    canActivate: [adminGuard],
    component: ManageUsersComponent,
  },
  {
    path: 'teacher-dashboard',
    canActivate: [teacherGuard],
    component: TeacherDashboardComponent,
  },
  {
    path: 'teacher-manage-courses',
    canActivate: [teacherGuard],
    component: TeacherManageCoursesComponent,
  },
  {
    path: 'teacher-assigments',
    canActivate: [teacherGuard],
    component: TeacherAssigmentsComponent,
  },
  {
    path: 'teacher-attendance',
    canActivate: [teacherGuard],
    component: TeacherAttendanceComponent,
  },
  {
    path: '**',
    component: HeroComponent,
  },
];
