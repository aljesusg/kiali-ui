import { userConstants } from '../config';

const INITIAL_STATE = { loggedIn: false, user: undefined, error: undefined, message: '' };

const authentication = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return state;
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        user: undefined,
        error: action.error,
        message: 'User or Password incorrect'
      };
    case userConstants.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authentication;
