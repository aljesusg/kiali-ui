import { userConstants } from '../config';
import * as userService from '../services/User';

export enum UserActionType {
  LOGIN = 'login',
  LOGOUT = 'logout'
}

export const request = user => {
  return { type: userConstants.LOGIN_REQUEST, user };
};

export const success = user => {
  return { type: userConstants.LOGIN_SUCCESS, user };
};

export const failure = error => {
  return { type: userConstants.LOGIN_FAILURE, error };
};

export const login = (username: string, password: string) => {
  return dispatch => {
    dispatch(request(username));
    userService.login(username, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

export const logout = () => {
  return { type: userConstants.LOGOUT };
};
