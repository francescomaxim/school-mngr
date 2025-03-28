import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Database, ref, set, get } from '@angular/fire/database';
import { User } from './models/user.model';
import { Store } from '@ngrx/store';
import { login, logout } from '../../stores/auth-store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private db = inject(Database);
  private router = inject(Router);

  private store = inject(Store);

  signup(
    email: string,
    password: string,
    role: 'teacher' | 'student',
    fullName: string
  ) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (cred) => {
        const uid = cred.user.uid;
        return set(ref(this.db, 'users/' + uid), {
          email,
          fullName,
          role,
        });
      }
    );
  }

  login(email: string, password: string, rememberMe: boolean) {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (cred) => {
        const uid = cred.user.uid;
        return get(ref(this.db, 'users/' + uid)).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const user = new User(
              userData.email,
              uid,
              '', // token (optional)
              new Date(),
              userData.role,
              userData.fullName
            );

            if (rememberMe) {
              localStorage.setItem('userData', JSON.stringify(user));
            }

            this.store.dispatch(login({ user }));

            return user;
          } else {
            throw new Error('User data not found in database.');
          }
        });
      }
    );
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
      localStorage.removeItem('userData');
      this.store.dispatch(logout());
    });
  }

  autoLogin() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    const userDataString = localStorage.getItem('userData');
    if (!userDataString) return;

    const userData = JSON.parse(userDataString);
    const loadedUser = new User(
      userData.email,
      userData.id,
      '', // token (optional)
      new Date(userData._tokenExpirationDate ?? new Date()),
      userData.role,
      userData.fullName
    );
    this.store.dispatch(login({ user: loadedUser }));
  }
}
