import * as fromTodos from '../todos/store/todos.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromShared from '../store/shared.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  todos: fromTodos.State;
  auth: fromAuth.State;
  shared: fromShared.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  todos: fromTodos.todosReducer,
  auth: fromAuth.authReducer,
  shared: fromShared.sharedReducer,
};
