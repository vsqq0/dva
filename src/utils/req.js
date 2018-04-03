import axios from 'axios';

// 注释此处取消rap-mock
// axios.interceptors.request.use(config => {
//   config.url =
//     'http://rap2api.taobao.org/app/mock/8574/' +
//     config.method +
//     '/' +
//     config.url.split('api/')[1];
//   console.log(config.url);
//   return config;
// });

/**
 * @param {string} url 必填
 * @returns {Object} params
 */
export const get = (url, params) => {
  return axios.get(devUrl(url), {
    params: params || {}
  });
};

/**
 * @param {string} url 必填
 * @returns {Object} params
 */
export const post = (url, params) => {
  return axios.post(devUrl(url), {
    params: params || {}
  });
};
/**
 * @param {string} url 必填
 * @returns {Object} params
 */
export const put = (url, params) => {
  return axios.put(devUrl(url), {
    params: params || {}
  });
};
/**
 * @param {string} url 必填
 * @returns {Object} params
 */
export const del = (url, params) => {
  return axios.delete(devUrl(url), {
    params: params || {}
  });
};
/**
 * ajax请求 可以传一个对象或者url字符串
 * @param {string} method "get" "post" "put" "delete"
 * @param {string} url
 * @param {string} data
 * @returns {Object}
 */
export const ajax = (method, url, data) => {
  return axios({
    method: method,
    url: devUrl(url),
    data: data
  });
};
const devUrl = url => {
  return process.env.NODE_ENV === 'development' ? url : url; // '/api/' +
};
