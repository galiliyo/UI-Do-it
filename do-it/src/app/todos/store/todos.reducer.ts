import { Todo } from '../../shared/interfaces/todo.interface';
import * as todosActions from './todos.actions';
import { TodoAction } from './todos.actions';

export interface State {
  todos: Todo[];
}

const initState: State = {
  todos: [],
};

// const _doneTodos = this.todos.reduce((acc: number[], todo: Todo) => {
//   return todo.isDone ? [...acc, todo.id] : [...acc];
// }, []);

// export function getDoneTodos() {
//   return _doneTodos;
// }

export function todosReducer(
  state = initState,
  action: todosActions.todosActions
) {
  let updatedTodos: Todo[];

  switch (action.type) {
    case todosActions.SET_TODOS: {
      updatedTodos = action.payload;
      break;
    }

    case todosActions.ADD_TODO: {
      updatedTodos = [...state.todos, action.payload];
      break;
    }

    case todosActions.REMOVE_TODO_SUCCESS: {
      const id = action.payload.id;
      updatedTodos = state.todos.filter(currTodo => {
        return currTodo.id !== id;
      });
      break;
    }

    // case todosActions.EDIT_TODO:
    case todosActions.EDIT_TODO_SUCCESS: {
      console.log('edit', action.payload);
      const id = action.payload.id;
      const idx = state.todos.findIndex(item => item.id === id);
      updatedTodos = [...state.todos];
      updatedTodos[idx] = action.payload;
      break;
    }

    case todosActions.CLEAR_COMPLETED: {
      updatedTodos = [...state.todos].filter(currTodo => !currTodo.isDone);
      break;
    }
    default:
      updatedTodos = state.todos;
  }
  return { ...state, todos: updatedTodos };
}
