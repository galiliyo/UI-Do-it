import * as SharedActions from './shared.actions';
import { log } from 'util';

export interface State {
  httpCounter: number;
  error: string;
}

const initState: State = {
  httpCounter: 0,
  error: null,
};

export function sharedReducer(
  state = initState,
  action: SharedActions.SharedActions
) {
  switch (action.type) {
    case SharedActions.INCREMENT_HTTP_COUNT:
      return {
        ...state,
        httpCounter: ++state.httpCounter,
        loading: state.httpCounter,
      };
    case SharedActions.DECREMENT_HTTP_COUNT:
      return {
        ...state,
        httpCounter: --state.httpCounter,
        loading: state.httpCounter,
      };
    case SharedActions.SET_ERROR:
      log('set error in reducer');
      return {
        ...state,
        error: action.payload.msg,
      };
    case SharedActions.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
