import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, ofType, Effect} from '@ngrx/effects';
import {switchMap, catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import {UserModel} from '../../UserModel.model';
import {AuthService} from '../auth.service';

export interface AuthResponseData {
  token: string;
  userId: string;
  message: string,
  status: string,
}

const handleAuthentication = (
  userName: string,
  token: string
) => {
  const user = new UserModel(userName, token);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    userName: userName,
    token: token,

  });
};

const handleError = (errorMessage: string) => {
  console.log('errorMessage', errorMessage);
  return new AuthActions.AuthenticateFail(errorMessage ? errorMessage : 'An unknown error occurred!');
};

@Injectable()
export class AuthEffects {

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const body = {
        email: authData.payload.email,
        password: authData.payload.password,
      };
      return this.http
        .post<AuthResponseData>(
          environment.api + '/login',
          body
        )
        .pipe(
          map(resData => {
              if (resData.status === 'ok') {
                this.router.navigate(['/todos']);
                return handleAuthentication(
                  resData.userId,
                  resData.token
                );

              } else {
                console.log('status not ok', resData.message);
                return handleError(resData.message);
              }
            }
          ));
    }));


  // @Effect({dispatch: false})
  // authRedirect = this.actions$.pipe(
  //   ofType(AuthActions.AUTHENTICATE_SUCCESS),
  //   tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
  //     if (authSuccessAction.payload.redirect) {
  //       this.router.navigate(['/']);
  //     }
  //   })
  // );


  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }
}
