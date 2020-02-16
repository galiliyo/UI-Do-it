import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as TodosActions from './store/todos.actions';
import * as fromApp from '../store/app.reducer';
import {Todo} from '../../shared/interfaces/todo.interface';

@Injectable()
export class TodoService {
  todosChanged = new Subject<Todo[]>();


  private todos: Todo[] = [];

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  setTodos(todos: Todo[]) {
    this.todos = todos;
    this.todosChanged.next(this.todos.slice());
  }

  getTodos() {
    return this.todos.slice();
  }

  getTodo(index: number) {
    return this.todos[index];
  }



  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.todosChanged.next(this.todos.slice());
  }

  updateTodo(index: number, newTodo: Todo) {
    this.todos[index] = newTodo;
    this.todosChanged.next(this.todos.slice());
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos.slice());
  }
}
