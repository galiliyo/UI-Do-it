import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as TodosActions from './store/todos.actions';
import * as fromApp from '../store/app.reducer';
import { Todo } from '../shared/interfaces/todo.interface';
import { map, switchMap, take } from 'rxjs/operators';
import { log } from 'util';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos: Todo[] = [];

  constructor(private store: Store<fromApp.AppState>) {
    console.log('getDoneTodos()', this.getDoneTodos());
  }

  //   getDoneTodos() {
  //     return this.store
  //       .select('todos')
  //       .pipe(take(1))
  //       .subscribe()
  //       });
  //   }
  // }
  // }
  getDoneTodos() {
    return this.store.select('todos').pipe(
      map(todos => {
        return todos.todos.reduce((acc: number[], todo: Todo) => {
          if (todo.isDone) {
            acc = [...acc, todo.id];
          }
          return acc;
        }, []);
      }),
      take(1)
    );
  }
}
