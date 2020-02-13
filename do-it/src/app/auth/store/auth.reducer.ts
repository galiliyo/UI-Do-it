import {UserModel} from '../../UserModel.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: UserModel;
  authError: string,
}

const initState: State = {
  user: null,
  authError: null,
};

export function authReducer(

  state = initState,
  action: AuthActions.AuthActions
) {

  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      console.log('success');
      const user = new UserModel(
        action.payload.userId,
        action.payload.token,
      );
      return {
        ...state,
        authError: null,
        user: user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      console.log('authfail',action.payload);
      return {
        ...state,
        user: null,
        authError: action.payload,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
