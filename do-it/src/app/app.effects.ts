import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth/store/auth.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {AuthResponseData} from './auth/store/auth.effects';


//
// @Injectable()
// export class AppEffects {
//   @Effect()
//   public displayError = this.actions$.pipe(ofType('DISPLAY_ERROR'))
//
//
//
//
//
//
//
//
//   constructor(private actions$: Actions) {}
//
// }
