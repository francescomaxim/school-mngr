import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HeroComponent } from './shared/components/hero/hero.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: HeroComponent,
  },
];
