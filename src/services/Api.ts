import axios, { AxiosError } from 'axios';
import Namespace from '../types/Namespace';
import MetricsOptions from '../types/MetricsOptions';
import ServiceListOptions from '../types/ServiceListOptions';
import store from '../store/ConfigStore';

export const authentication = (user: string = '', pass: string = '') => {
  const actualState = store.getState() || {};
  let username = user;
  let password = pass;
  if (actualState['authentication']['user'] !== undefined) {
    username = actualState['authentication']['user'].username;
    password = actualState['authentication']['user'].password;
  }
  return {
    username: username,
    password: password
  };
};

let newRequest = (method: string, url: string, queryParams: any, data: any, auth: any = null) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data,
      headers: { 'X-Auth-Type-Kiali-UI': '1' },
      params: queryParams,
      auth: auth || authentication()
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const login = (username: string, password: string) => {
  return newRequest('get', '/api/status', {}, {}, authentication(username, password));
};

export const getStatus = () => {
  return newRequest('get', '/api/status', {}, {});
};

export const getNamespaces = () => {
  return newRequest('get', `/api/namespaces`, {}, {});
};

export const getNamespaceMetrics = (namespace: String, params: any) => {
  return newRequest('get', `/api/namespaces/${namespace}/metrics`, params, {});
};

export const getIstioConfig = (namespace: String, objects: String[]) => {
  let params = objects && objects.length > 0 ? { objects: objects.join(',') } : {};
  return newRequest('get', `/api/namespaces/${namespace}/istio`, params, {});
};

export const getIstioConfigDetail = (namespace: String, objectType: String, object: String) => {
  return newRequest('get', `/api/namespaces/${namespace}/istio/${objectType}/${object}`, {}, {});
};

export const getServices = (namespace: String, params?: ServiceListOptions) => {
  return newRequest('get', `/api/namespaces/${namespace}/services`, params, {});
};

export const getServiceMetrics = (namespace: String, service: String, params: MetricsOptions) => {
  return newRequest('get', `/api/namespaces/${namespace}/services/${service}/metrics`, params, {});
};

export const getServiceHealth = (namespace: String, service: String) => {
  return newRequest('get', `/api/namespaces/${namespace}/services/${service}/health`, {}, {});
};

export const getGrafanaInfo = () => {
  return newRequest('get', `/api/grafana`, {}, {});
};

export const getJaegerInfo = () => {
  return newRequest('get', `/api/jaeger`, {}, {});
};

export const getGraphElements = (namespace: Namespace, params: any) => {
  return newRequest('get', `/api/namespaces/${namespace.name}/graph`, params, {});
};

export const getServiceDetail = (namespace: String, service: String) => {
  return newRequest('get', `/api/namespaces/${namespace}/services/${service}`, {}, {});
};

export const getServiceValidations = (namespace: String, service: String) => {
  return newRequest('get', `/api/namespaces/${namespace}/services/${service}/istio_validations`, {}, {});
};

export const getErrorMsg = (msg: string, error: AxiosError) => {
  let errorMessage = msg;
  if (error && error.response && error.response.data && error.response.data['error']) {
    errorMessage = `${msg} Error: [ ${error.response.data['error']} ]`;
  }
  return errorMessage;
};
