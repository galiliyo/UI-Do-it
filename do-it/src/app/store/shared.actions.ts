import { Action } from '@ngrx/store';

export const INCREMENT_HTTP_COUNT = '[Shared] Inc Http Count';
export const DECREMENT_HTTP_COUNT = '[Shared] Dec Http Count';
export const SET_ERROR = '[Shared] Set Error';
export const CLEAR_ERROR = '[Shared] Clear Error';

export class IncHttpCount implements Action {
  readonly type = INCREMENT_HTTP_COUNT;
  constructor() {}
}
export class DecHttpCount implements Action {
  readonly type = DECREMENT_HTTP_COUNT;
  constructor() {}
}

export class SetError implements Action {
  readonly type = SET_ERROR;
  constructor(public payload: { msg: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type SharedActions = IncHttpCount | DecHttpCount | SetError | ClearError;
