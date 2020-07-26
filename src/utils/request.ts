import axios from "axios";

const service = axios.create({
  baseURL: "http://127.0.0.1:3000/",
  timeout: 1000
});

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    const token = sessionStorage.getItem("token") || "";
    config.headers["TOKEN"] = token;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    try {
      if (response.data.code === 200) {
        sessionStorage.setItem("token", response.data.token);
      }
    } catch (e) {
      console.log(e);
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
