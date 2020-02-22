import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as todosActions from '../store/todos.actions';
import { ClickOutsideDirective } from '../../shared/directives/clickOutsideDirective';
import { log } from 'util';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @ViewChild('inputEl', { static: false })
  inputEl: ElementRef;

  @Input()
  item: Todo;
  @Output() toggleHandler = new EventEmitter();
  @Output() deleteHandler = new EventEmitter();
  private inEditMode: boolean = false;
  private editedTodo: FormControl;
  inputStyle: object;

  constructor(private el: ElementRef, private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.editedTodo = new FormControl(this.item.todo);
  }

  ngDoCheck() {
    this.inputStyle = {
      'todo-item__title__input--done': this.item.isDone,
      'todo-item__title__input--edit': this.inEditMode,
    };
  }

  onToggleDone(id: number) {
    console.log('onToggleDone undef', id);

    this.dispatchUpdatedTodo(id, !this.item.isDone);
  }

  onSubmitEdit(id: number) {
    if (this.inEditMode) {
      this.dispatchUpdatedTodo(id, false);
      this.inEditMode = false;
    }
  }

  private dispatchUpdatedTodo(id: number, newIsDoneStatus: boolean) {
    console.log('dispatchUpdatedTodo undef', id);

    this.store.dispatch(
      new todosActions.EditTodo({
        todo: this.editedTodo.value,
        isDone: newIsDoneStatus,
        id: id,
      })
    );
  }

  onEdit() {
    this.inEditMode = true;
    this.inputEl.nativeElement.focus();
    this.inputEl.nativeElement.select();
  }
}
