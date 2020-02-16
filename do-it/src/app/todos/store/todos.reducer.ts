import { Todo } from '../../../shared/interfaces/todo.interface';
import * as todosActions from './todos.actions';
import { TodoAction } from './todos.actions';

export interface State {
  todos: Todo[];
}

const initState: State = {
  todos: [
    // { todo: 'Buy Milk', isDone: true, id: 10001 },
    // { todo: 'Keep Calm', isDone: false, id: 10002 },
    // { todo: 'Learn Angular', isDone: true, id: 10003 },
  ],
};
// Todo: Is this I declare types?

export function todosReducer(state = initState, action: todosActions.todosActions) {
  let updatedTodos: Todo[];

  switch (action.type) {
    case todosActions.SET_TODOS: {

      updatedTodos = action.payload ;
      break;
    }

    case todosActions.ADD_TODO_SUCCESS: {
      updatedTodos = [...state.todos, action.payload];
      break;
    }

    case todosActions.REMOVE_TODO: {
      const id = action.payload.id;
      updatedTodos = state.todos.filter(currTodo => {
        return currTodo.id !== id;
      });
      break;
    }

    case todosActions.EDIT_TODO: {
      const id = action.payload.id;
      const idx = state.todos.findIndex(item => item.id === id);
      console.log('editing', id, idx);
      updatedTodos = [...state.todos];
      updatedTodos[idx] = action.payload;
      break;
    }

    case todosActions.TOGGLE_DONE: {
      const id = action.payload.id;
      const idx = state.todos.findIndex(item => item.id === id);
      updatedTodos = [...state.todos];
      updatedTodos[idx].isDone = !updatedTodos[idx].isDone;
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
