import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InplaceModule } from 'primeng/inplace';
import { TodoMainComponent } from './todo-main.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { CountDonePipe } from './count-done.pipe';
import { ClickOutsideDirective } from './clickOutsideDirective';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    TodoMainComponent,
    TodoItemComponent,
    CountDonePipe,
    ClickOutsideDirective,
  ],
  providers: [HttpClient],
  imports: [
    CardModule,
    InplaceModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [TodoMainComponent],
})
export class TodosModule {}
