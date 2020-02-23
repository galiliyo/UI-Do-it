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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [
    trigger('divState', [
      state(
        'out',
        style({
          transform: 'translateY(-60px)',
          opacity: '0',
        })
      ),
      state(
        'in',
        style({
          opacity: '1',
          transform: 'translateY(0px)',
        })
      ),
      transition('out=>in', animate(500)),
      transition('in=>out', animate(500)),
    ]),
  ],
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
  state: string = 'out';

  constructor(private el: ElementRef, private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.editedTodo = new FormControl(this.item.todo);
  }
  ngAfterViewInit() {
    this.state = 'in';
  }
  ngDoCheck() {
    this.inputStyle = {
      'todo-item__title__input--done': this.item.isDone,
      'todo-item__title__input--edit': this.inEditMode,
    };
  }

  onToggleDone(id: number) {
    this.dispatchUpdatedTodo(id, !this.item.isDone);
  }

  onSubmitEdit(id: number) {
    if (this.inEditMode) {
      this.dispatchUpdatedTodo(id, false);
      this.inEditMode = false;
    }
  }

  private dispatchUpdatedTodo(id: number, newIsDoneStatus: boolean) {
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
