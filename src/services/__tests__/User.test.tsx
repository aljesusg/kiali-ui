jest.mock('../User');
const USER = require('../User');

describe('#UserService', () => {
  it('should logout User', () => {
    sessionStorage.setItem('user', 'admin');
    sessionStorage.setItem('password', 'admin');
    USER.logout();
    expect(sessionStorage.getItem('user')).toBeNull();
    expect(sessionStorage.getItem('password')).toBeNull();
  });

  it('should login User', () => {
    const username = 'admin';
    const password = 'admin';
    USER.login(username, password);
    expect(sessionStorage.getItem('user')).toEqual(username);
    expect(sessionStorage.getItem('password')).toEqual(password);
  });
});
