import { Action } from '@ngrx/store';
import { Todo } from '../../../shared/interfaces/todo.interface';

export const FETCH_TODOS = '[Todos] Fetch Todos';
export const ADD_TODO = '[Todos] Add Todo';
export const REMOVE_TODO = '[Todos] Remove Todo';
export const EDIT_TODO = '[Todos] Edit Todo';
export const TOGGLE_DONE = '[Todos] Toggle Done';
export const CLEAR_COMPLETED = '[Todos] Clear Completed';

export interface TodoAction extends Action {
  payload?: Todo;
  id?: string;
}

export class FetchTodos implements Action {
  readonly type = FETCH_TODOS;
}

export class AddTodo implements Action {
  constructor(public payload: Todo) {}
  readonly type = ADD_TODO;
}

export class RemoveTodo implements Action {
  constructor(public payload: { id: number }) {}
  readonly type = REMOVE_TODO;
}

export class EditTodo implements Action {
  constructor(public payload: Todo) {}
  readonly type = EDIT_TODO;
}

export class ToggleDone implements Action {
  constructor(public payload: { id: number }) {}
  readonly type = TOGGLE_DONE;
}

export class ClearCompleted implements Action {
  readonly type = CLEAR_COMPLETED;
}

// export type todosActions = AddTodo | RemoveTodo | EditTodo | ToggleDone;
