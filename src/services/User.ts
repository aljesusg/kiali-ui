import * as API from './Api';

export const login = (username: string, password: string) => {
  return API.login(username, password).then(response => {
    if (response['statusText'] !== 'OK') {
      Promise.reject(response['statusText']);
    }
    return { username: username, password: password };
  });
};
