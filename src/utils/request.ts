import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 50000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * axios 二次封装，整合 TS 类型
 * @param method  请求类型
 * @param url  请求地址
 * @param submitData  对象类型，提交数据
 */
export const http = (method, url, submitObject) => {
  return instance.request({
    method,
    url,
    /*
      get 请求，使用字段是 params
      其他请求，使用字段是 data
    */
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitObject,
  });
};

export default instance;
