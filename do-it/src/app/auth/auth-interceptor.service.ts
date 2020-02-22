import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  tap,
  retry,
  catchError,
  switchMap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { Observable, of, Subject, throwError } from 'rxjs';
import * as AuthActions from './store/auth.actions';
import * as SharedActions from '../store/shared.actions';
import { log } from 'util';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(new SharedActions.IncHttpCount());
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.store.dispatch(new SharedActions.DecHttpCount());
        } else if (event instanceof HttpErrorResponse) {
          this.store.dispatch(new SharedActions.DecHttpCount());
          console.log('error has occured', event);
        }
      }),
      retry(1),
      catchError(err => this.handleError(err))
    );
  }

  handleError(error) {
    let msg: string;

    switch (error.status) {
      //       case 400:
      //       case 401:
      case 404:
        msg = 'Could not find resource';
        break;
      //       case 500:
      case 504:
        msg = 'Could not connect to server';
        break;
      default:
        msg = 'An unknown error occurred';
    }

    log('dispatching', msg);
    this.store.dispatch(new SharedActions.SetError({ msg: msg }));
    this.store.dispatch(new SharedActions.DecHttpCount());
    return throwError(error);
  }
}

//   public interceptAfter(res: HttpResponse<any>, next: HttpHandler) {
//     setTimeout(() => {
//       this._calls -= 1;
//       this.calls.next(this._calls);
//     }, 0);
//
//     switch (res.res.status) {
//       case 400:
//       case 401:
//       case 404:
//       case 500:
//       case 504:
//       // this.commonSrv.error.next(
//       //     new UiError(
//       //         response.response.status,
//       //         response.response.statusText,
//       //         JSON.parse(response.response['_body']),
//       //         response.response.url)
//       // );
//       // break;
//       default:
//         break;
//     }
//     return next.handle(res);
//   }
// }
