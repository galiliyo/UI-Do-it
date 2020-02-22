import * as SharedActions from './shared.actions';
import { log } from 'util';

export interface State {
  httpCounter: number;
  error: string;
  loading: boolean;
}

const initState: State = {
  httpCounter: 0,
  error: null,
  loading: false,
};

export function sharedReducer(
  state = initState,
  action: SharedActions.SharedActions
) {
  switch (action.type) {
    case SharedActions.INCREMENT_HTTP_COUNT:
      console.log('inc action');
      return {
        ...state,
        httpCounter: ++state.httpCounter,
        loading: state.httpCounter != 0,
      };
    case SharedActions.DECREMENT_HTTP_COUNT:
      console.log('dec action');
      return {
        ...state,
        httpCounter: --state.httpCounter,
        loading: state.httpCounter != 0,
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
