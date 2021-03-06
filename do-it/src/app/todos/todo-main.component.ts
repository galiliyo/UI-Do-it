import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../shared/interfaces/todo.interface';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as todosActions from './store/todos.actions';
import { map } from 'rxjs/operators';
import { TodoService } from './todos.service';
import { log } from 'util';
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
})
export class TodoMainComponent implements OnInit, OnDestroy {
  todos: Todo[];

  unCompleted: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private todosService: TodoService
  ) {}

  subscription: Subscription;

  ngOnInit() {
    // this.store.dispatch(new todosActions.FetchTodos());
    this.subscription = this.store
      .select('todos')
      .pipe(map(todosState => todosState.todos))
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
        this.unCompleted = this.todos.length;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(id: number) {
    this.store.dispatch(new todosActions.RemoveTodoReq({ id }));
  }

  onSubmit(f) {
    if (f.value['new-todo'] === '' || f.value['new-todo'] === null) {
      return;
    }
    this.store.dispatch(
      new todosActions.AddTodo({
        todo: f.value['new-todo'],
        isDone: false,
      })
    );
    f.reset();
  }

  onClearCompleted() {
    this.store.dispatch(new todosActions.ClearCompleted());
  }
}
