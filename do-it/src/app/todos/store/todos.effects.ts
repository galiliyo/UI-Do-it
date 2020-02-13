import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import * as TodosActions from './todos.actions';
import { Todo } from '../../../shared/interfaces/todo.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TodosEffects {
  @Effect()
  fetchTodos = this.actions$.pipe(
    ofType(TodosActions.FETCH_TODOS),
    switchMap(() => {
      return this.http.get<Todo[]>(environment.api + '/todos');
    }),
    map(todos => {
      return todos.map(todo => {
        return {
          ...todo,
        };
      });
    }),
    map(todos => {
      return new TodosActions.SetTodos(todos);
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
// fetchTodos = this.actions$.pipe(
//   ofType(TodosActions.FETCH_TODOS),
//   switchMap(() => {
//     return this.http.get<Todo[]>(environment.api + '/todos');
//   }),
//   map(todos => {
//     return todos.map(todo => {
//       return {
//         ...todo,
//       };
//     });
//   }),
//   map(todos => {
//     return new TodosActions.SetTodos(todos);
//   })
// );
