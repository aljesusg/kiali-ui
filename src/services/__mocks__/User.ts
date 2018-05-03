export const login = (username: string, password: string) => {
  sessionStorage.setItem('user', username);
  sessionStorage.setItem('password', password);
  return username;
};

export const logout = () => {
  // remove user from local storage to log user out
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('password');
};
