import {Actions, ofType, Effect} from '@ngrx/effects';
import {map, mapTo, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import * as fromApp from '../../store/app.reducer';
import * as TodosActions from './todos.actions';
import {AddTodo} from './todos.actions';
import {Todo} from '../../../shared/interfaces/todo.interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import {log} from 'util';
import {Observable, of} from 'rxjs';

// import {AuthResponseData} from '../../auth/store/auth.effects';


interface resData {
  todo: string,
  isDone: boolean,
  id: string
}


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
  @Effect()
  addTodo = this.actions$.pipe(
    ofType(TodosActions.ADD_TODO),
    switchMap((todo: TodosActions.AddTodo) => {
      const body = {
        todo: todo.payload.todo,
        isDone: false,
      };
      return this.http
        .post<resData>(
          environment.api + '/todos',
          body
        );

    }), map(res => new TodosActions.AddTodoSuccess(res)));


  // @ts-ignore
  @Effect()
  removeTodo = this.actions$.pipe(
    ofType(TodosActions.REMOVE_TODO),
    switchMap((todo: TodosActions.RemoveTodo) => {
      const id = todo.payload.id;

      console.log('id', id);
    this.http
        .delete<resData>(
          environment.api + '/todos/' + id,
        );
    return id
    }),of(4));

  // }), map(res => new TodosActions.AddTodoSuccess(res)));
// this.actions$.pipe(
//     ofType(gameActions.CREATE_GAME),
//   map((action: AddGame) => action.payload),
//   switchMap(newGame => this.svc.insert(newGame)),
//   map((response) => new AddGameSuccess(response.id)),
//   catchError((err) => [new AddGameError(err)])
// );


  constructor(private actions$: Actions, private http: HttpClient, private store: Store<AppState>) {
  }
}



