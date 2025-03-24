import { createAction, props } from '@ngrx/store';
import { User } from '../../core/authentication/models/user.model';

export const login = createAction(
  '[Auth] LogIn',
  props<{ user: User | undefined }>()
);

export const logout = createAction('[Auth] LogOut');
