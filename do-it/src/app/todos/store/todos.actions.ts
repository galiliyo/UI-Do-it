import { Action } from '@ngrx/store';
import { Todo } from '../../shared/interfaces/todo.interface';

export const FETCH_TODOS = '[Todos] Fetch Todos';
export const ADD_TODO = '[Todos] Add Todo';
export const ADD_TODO_SUCCESS = '[Todos] Add Todo Success';
export const REMOVE_TODO_REQ = '[Todos] Remove Todo Request';
export const REMOVE_TODO_SUCCESS = '[Todos] Remove Todo';
export const EDIT_TODO = '[Todos] Edit Todo';
export const EDIT_TODO_SUCCESS = '[Todos] Edit Todo Success';
export const CLEAR_COMPLETED = '[Todos] Clear Completed';
export const SET_TODOS = '[Todos] Set Todos';

export interface TodoAction extends Action {
  payload?: Todo;
  id: string;
}

export class SetTodosReq implements Action {
  readonly type = SET_TODOS;

  constructor(public payload: Todo[]) {}
}

export class FetchTodos implements Action {
  readonly type = FETCH_TODOS;
}

export class AddTodo implements Action {
  constructor(public payload: Todo) {}

  readonly type = ADD_TODO;
}
export class AddTodoSuccess implements Action {
  constructor(public payload: Todo) {}

  readonly type = ADD_TODO_SUCCESS;
}

export class RemoveTodoReq implements Action {
  constructor(public payload: { id: number }) {}

  readonly type = REMOVE_TODO_REQ;
}

export class RemoveTodoSuccess implements Action {
  constructor(public payload: { id: number }) {}

  readonly type = REMOVE_TODO_SUCCESS;
}

export class EditTodo implements Action {
  // also handles toggleTodo
  constructor(public payload: Todo) {}

  readonly type = EDIT_TODO;
}
export class EditTodoSuccess implements Action {
  constructor(public payload: Todo) {}

  readonly type = EDIT_TODO_SUCCESS;
}

export class ClearCompleted implements Action {
  readonly type = CLEAR_COMPLETED;
}

export type todosActions =
  | AddTodo
  | RemoveTodoReq
  | RemoveTodoSuccess
  | EditTodo
  | EditTodoSuccess
  | SetTodosReq
  | FetchTodos
  | ClearCompleted;
