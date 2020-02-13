import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';

@Pipe({
  name: 'countDone',
})
export class CountDonePipe implements PipeTransform {
  transform(todos: Todo[]) {
    console.log('1', 1);
    const unDoneCount = todos.filter(todoItem => !todoItem.isDone).length;
    if (unDoneCount === 0) {
      return 'All Done!';
    } else {
      const str = unDoneCount === 1 ? 'item' : 'items';
      return `${unDoneCount} ${str} left`;
    }
  }
}
