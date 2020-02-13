import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Todo } from '../shared/interfaces/todo.interface';
import * as fromApp from './store/app.reducer';
import * as TodosActions from '../app/todos/store/todos.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Todo[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
