// 登录
import http from '../utilts/request'

// code
const LoginCode = () => {
  return http({
    url: '/captcha',
    method: 'GET'
  })
}

// 登录接口
const getLogin = (data) => {
  console.log('data===>', data)
  return http({
    url: `/login?username=${data.username}&password=${data.password}&code=${data.code}&token=${data.token}`,
    method: 'POST'
  })
}

export default {
  LoginCode,
  getLogin
}
