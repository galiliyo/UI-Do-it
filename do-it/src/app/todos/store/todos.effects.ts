import {ActionsSubject} from '@ngrx/store';
import {Effect, ofType} from '@ngrx/effects';
import * as AuthActions from '../../auth/store/auth.actions';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthResponseData} from '../../auth/store/auth.effects';
import * as TodosActions from './todos.actions'
import {Todo} from '../../../shared/interfaces/todo.interface';
import {HttpClient, HttpClientModule} from '@angular/common/http';

export interface  TodoResponseData{
  todos:Todo[]
}




export class TodoEffects {

  @Effect()
  fetchTodos = this.actions$.pipe(
    ofType(TodosActions.FETCH_TODOS),
    switchMap((todoData: TodosActions.FetchTodos) => {

      return this.http.get<TodoResponseData>(
          environment.api + '/todos'

        )
        // .pipe(
        //   map(resData => {
        //     console.log('resData', resData);
        //     return resData;
        //       // if (resData.status === 'ok') {
              //   this.router.navigate(['/todos']);
              //   return handleAuthentication(
              //     resData.userId,
              //     resData.token
              //   );

              // } else {
              //   console.log('status not ok', resData.message);
              //   return handleError(resData.message);
              // }
            }
          ));
    // }));

  constructor (private actions$:ActionsSubject, private http:HttpClient){}

}
