// axios
import axios from 'axios'
import store from '../store'
const instance = axios.create({
  baseURL: 'https://www.markerhub.com/vueadmin-java',
  timeout: 5000
  // headers: {'X-Custom-Header': 'foobar'}
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function async(response) {
    // console.log('response', response)
    const authorization = response.headers.authorization
    store.commit('user/setToken', authorization)
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 传参统一
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return instance(options)
}

export default request
