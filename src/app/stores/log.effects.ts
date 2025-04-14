import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../core/services/logger.service';
import { Store } from '@ngrx/store';
import { selectUser } from './auth-store/auth.selectors';

@Injectable()
export class LogEffects {
  private actions$ = inject(Actions);
  private logService = inject(LoggerService);
  private store = inject(Store);

  constructor() {}

  logUserActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          // aici adaugăm acțiunile pe care vrem să le logăm
          '[Assignments] Add Assignment',
          '[Assignments] Delete Assignment',
          '[Assignments] Update Assignment',
          '[Attendance] Save Attendance',
          '[Todo] Add Todo',
          '[Todo] Delete Todo',
          '[Todo] Update Todo'
        ),
        tap(async (action) => {
          const user = await this.store.selectSignal(selectUser)();

          await this.logService.log(
            user?.id ?? 'guest',
            action.type,
            JSON.stringify(action)
          );
        })
      ),
    { dispatch: false }
  );
}
