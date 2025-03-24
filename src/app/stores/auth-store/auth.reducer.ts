import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { User } from '../../core/authentication/models/user.model';

export interface AuthState {
  user: User | undefined;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer<AuthState>(
  initialAuthState,
  on(login, (state, action) => ({ ...state, user: action.user })),
  on(logout, () => ({ ...initialAuthState }))
);
