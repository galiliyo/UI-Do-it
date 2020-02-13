import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../../shared/interfaces/todo.interface';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as todosActions from './store/todos.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
})
export class TodoMainComponent implements OnInit {
  todos: Todo[];

  unCompleted: any;

  constructor(private store: Store<fromApp.AppState>) {}

  subscription: Subscription;

  ngOnInit() {
    this.store.dispatch(new todosActions.FetchTodos());
    this.subscription = this.store
      .select('todos')
      .pipe(map(todosState => todosState.todos))
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });
  }

  onToggleDone(id: number) {
    console.log('id', id);
    this.store.dispatch(new todosActions.ToggleDone({ id }));
  }

  onDelete(id: number) {
    this.store.dispatch(new todosActions.RemoveTodo({ id }));
  }

  onSubmit(f) {
    console.log('f', f);
    if (f.value['new-todo'] === '' || f.value['new-todo'] === null) {
      return;
    }
    console.log(f.value);
    const id = Math.floor(Math.random() * 10000);
    this.store.dispatch(
      new todosActions.AddTodo({
        todo: f.value['new-todo'],
        isDone: false,
        id,
      })
    );
    f.reset();
  }

  onClearCompleted() {
    this.store.dispatch(new todosActions.ClearCompleted());
  }
}
