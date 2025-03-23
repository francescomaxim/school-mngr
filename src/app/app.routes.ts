import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { AdminPanelComponent } from './features/admin/admin-panel/admin-panel.component';
import { adminGuard } from './core/authentication/guards/admin.guard';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users.component';

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
    component: ManageUsersComponent,
    canActivate: [adminGuard],
  },
  {
    path: '**',
    component: HeroComponent,
  },
];
