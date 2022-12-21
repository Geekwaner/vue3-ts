import { message } from '@/components/XtxUI';
import { useMemberStore } from '@/store';
import axios, { type Method } from 'axios';
// 官方说明：https://pinia.vuejs.org/core-concepts/outside-component-usage.html
// ❌ 非组件中，Pinia 常见错误写法
// const member = useMemberStore();
// console.log('member -----> ', member);

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 50000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    // ✅ 在组件外，哪里使用，写哪里(消费前获取)
    const member = useMemberStore();
    const { token } = member.profile;
    // token 和 headers 的非空判断，为了兼容ts
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    // 无网络，错误提示
    if (error.code === 'ERR_NETWORK') {
      message({ text: '您的网络似乎开小差~~' });
    } else {
      // 有网络，但后端认为有错误，提示后端响应的错误
      // console.log('error -----> ', error.response.data.message);
      message({ type: 'error', text: error.response?.data?.message });
    }
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
export const http = <T>(method: Method, url: string, submitObject?: object) => {
  return instance.request<{
    code: string;
    msg: string;
    // 不能写死，因为每个请求返回的数据类型都不一样
    result: T;
  }>({
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
