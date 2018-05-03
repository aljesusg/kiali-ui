import { userConstants } from '../config';
import * as userService from '../services/User';
import { createBrowserHistory } from 'history';

export enum UserActionType {
  LOGIN = 'login',
  LOGOUT = 'logout'
}

export const history = createBrowserHistory();

const request = user => {
  return { type: userConstants.LOGIN_REQUEST, user };
};

const success = user => {
  return { type: userConstants.LOGIN_SUCCESS, user };
};

const failure = error => {
  return { type: userConstants.LOGIN_FAILURE, error };
};

export const login = (username: string, password: string) => {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(sessionStorage.getItem('user')));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

export const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
};
