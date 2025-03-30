import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../environments/environment';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './stores/auth-store/auth.reducer';
import { coursesReducer } from './stores/courses-store/courses.reducer';
import { CoursesEffects } from './stores/courses-store/courses.effects';
import { assignmentsReducer } from './stores/assigments-store/assigments.reducer';
import { AssignmentsEffects } from './stores/assigments-store/assigments.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      auth: authReducer,
      courses: coursesReducer,
      assignments: assignmentsReducer,
    }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),

    provideEffects(CoursesEffects, AssignmentsEffects),
  ],
};
