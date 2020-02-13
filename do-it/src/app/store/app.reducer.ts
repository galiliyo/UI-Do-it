import * as fromTodos from "../todos/store/todos.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  todos: fromTodos.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  todos: fromTodos.todosReducer,
  auth: fromAuth.authReducer
};
