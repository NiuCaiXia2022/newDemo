//  封装
// const SET_TOKEN = 'token'

const setItem = (key, value) => {
  localStorage.setItem(key, value)
}

const getItem = (value) => {
  return localStorage.getItem(value)
}

const remoteToken = (key) => {
  localStorage.removeItem(key)
}
export default {
  setItem,
  getItem,
  remoteToken
}
