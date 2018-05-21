import { request, success, failure } from '../UserAction';
import { userConstants } from '../../config';

const username = 'admin';

describe('UserActions', () => {
  it('User action request', () => {
    expect(request(username)).toEqual({ type: userConstants.LOGIN_REQUEST, user: username });
  });

  it('User action success', () => {
    expect(success(username)).toEqual({ type: userConstants.LOGIN_SUCCESS, user: username });
  });

  it('User action failure', () => {
    const error = 'Error with username or password';
    expect(failure(error)).toEqual({ type: userConstants.LOGIN_FAILURE, error });
  });
});
