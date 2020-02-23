import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as fromApp from '../../store/app.reducer';
import * as TodosActions from './todos.actions';
import { AddTodo } from './todos.actions';
import { Todo } from '../../shared/interfaces/todo.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import { log } from 'util';
import { Observable, of } from 'rxjs';
import { TodoService } from '../todos.service';

interface resData {
  todo: string;
  isDone: boolean;
  id: number;
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
      return new TodosActions.SetTodosReq(todos);
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

      return this.http.post<resData>(environment.api + '/todos', body).pipe(
        map(
          res =>
            new TodosActions.AddTodoSuccess({
              todo: res.todo,
              isDone: false,
              id: res.id,
            })
        )
      );
    })
  );

  @Effect()
  editTodo = this.actions$.pipe(
    ofType(TodosActions.EDIT_TODO),
    switchMap((todo: TodosActions.EditTodo) => {
      const body = {
        todo: todo.payload.todo,
        isDone: todo.payload.isDone,
        id: todo.payload.id,
      };
      console.log(
        'environment.api  +`/todos/${todo.payload.id}`, body',
        environment.api + `/todos/${todo.payload.id}`,
        body
      );
      return this.http
        .put<resData>(environment.api + `/todos/${todo.payload.id}`, body)
        .pipe(
          map(
            res =>
              new TodosActions.EditTodoSuccess({
                todo: res.todo,
                isDone: res.isDone,
                id: res.id,
              })
          )
        );
    })
  );

  @Effect()
  removeTodo = this.actions$.pipe(
    ofType(TodosActions.REMOVE_TODO_REQ),
    switchMap((todo: TodosActions.RemoveTodoReq) => {
      const id = <any>todo.payload.id;
      return this.http
        .delete<resData>(environment.api + `/todos/${id}`)
        .pipe(map(() => new TodosActions.RemoveTodoSuccess({ id })));
    })
  );
  // @Effect()
  //   clearCompleted = this.actions$.pipe(
  //     ofType(TodosActions.CLEAR_COMPLETED),
  //     mergeMap((this.todoService.getDoneTodos()) => {
  //    return  this.store.dispatch(new this.TodoActions.RemoveTodosSuccess()  )
  //     })
  //   );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}
}
