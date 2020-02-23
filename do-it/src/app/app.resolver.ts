import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import { Todo } from './shared/interfaces/todo.interface';
import * as fromApp from './store/app.reducer';
import * as TodosActions from '../app/todos/store/todos.actions';
import { AuthService } from './auth/auth.service';
import * as AuthActions from './auth/store/auth.actions';
import { log } from 'util';

@Injectable({ providedIn: 'root' })
export class TodosResolverService implements Resolve<Todo[]> {
  userSub: Subscription;
  isAuthenticated: boolean;

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('resolver');
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user; // referring to user in store
      });
    let userFromLocal = this.authService.getLocalStorageUser();

    if (!this.isAuthenticated && userFromLocal) {
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          userName: userFromLocal.name,
          token: userFromLocal.token,
        })
      );
    }

    return this.store.select('todos').pipe(
      take(1),
      map(todosState => {
        return todosState.todos;
      }),
      switchMap(todos => {
        if (todos.length === 0) {
          this.store.dispatch(new TodosActions.FetchTodos());
          return this.actions$.pipe(ofType(TodosActions.SET_TODOS), take(1));
        } else {
          return of(todos);
        }
      })
    );
  }
}
