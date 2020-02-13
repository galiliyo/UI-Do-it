import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Todo} from '../../shared/interfaces/todo.interface';
import {Observable} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as todosActions from './store/todos.actions';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
})
export class TodoMainComponent implements OnInit {
  todos: Observable<{ todos: Todo[] }>;

  unCompleted: any;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.todos = this.store.select('todos');


    this.store
      .select('todos')
      .subscribe(res => (this.unCompleted = res.todos.length));
  }

  onToggleDone(id: number) {
    console.log('id', id);
    this.store.dispatch(new todosActions.ToggleDone({id}));
  }

  onDelete(id: number) {
    this.store.dispatch(new todosActions.RemoveTodo({id}));
  }

  onSubmit(f) {
    console.log('f', f);
    if (f.value['new-todo'] === ''|| f.value['new-todo'] === null) {
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
