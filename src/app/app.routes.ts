import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { AdminPanelComponent } from './features/admin/admin-panel/admin-panel.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'adminpanel',
    component: AdminPanelComponent,
  },
  {
    path: '**',
    component: HeroComponent,
  },
];
