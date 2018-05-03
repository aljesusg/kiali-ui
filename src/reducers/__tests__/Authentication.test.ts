import userReducer from '../Authentication';
import { userConstants } from '../../config';

let userStateMock = {
  loggedIn: false,
  user: null,
  error: null,
  message: ''
};

describe('Authentication reducer', () => {
  it('should return the initial state without user', () => {
    expect(userReducer(undefined, {})).toEqual(userStateMock);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(
      userReducer(userStateMock, {
        type: userConstants.LOGIN_REQUEST
      })
    ).toEqual({
      loggingIn: false,
      user: null,
      error: null,
      message: ''
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      userReducer(userStateMock, {
        type: userConstants.LOGIN_SUCCESS,
        user: 'admin'
      })
    ).toEqual({
      loggedIn: true,
      user: 'admin'
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(
      userReducer(userStateMock, {
        type: userConstants.LOGIN_FAILURE,
        error: 'Wrong user'
      })
    ).toEqual({
      loggedIn: false,
      user: null,
      error: 'Wrong user',
      message: 'User or Password incorrect'
    });
  });

  it('should handle LOGOUT', () => {
    expect(
      userReducer(userStateMock, {
        type: userConstants.LOGOUT
      })
    ).toEqual(userStateMock);
  });

  it('should handle default', () => {
    expect(
      userReducer(userStateMock, {
        type: 'Other option'
      })
    ).toEqual(userStateMock);
  });
});
