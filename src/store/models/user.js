// 接口
import Login from '../../api/login'
import Storage from '../../utilts/storage'

export default {
  namespaced: true,
  // 数据  函数
  state: () => ({
    token: Storage.getItem('token') || '',
    info: Storage.getItem('info') || ''
  }),
  // 方法  对象
  mutations: {
    // token
    setToken(state, token) {
      console.log(token)
      state.token = token
      Storage.setItem('token', state.token)
    },
    // 用户信息
    userInfo(state, info) {
      state.info = info
    }
  },
  actions: {
    // 验证码
    async loginCode({ commit }) {
      try {
        const response = await Login.LoginCode()
        console.log(response)
        commit('setToken', response.data.data)
        return response.data.data
      } catch (error) {
        console.log(error)
      }
    },

    // 登录
    async userLogin({ commit }, playout) {
      try {
        console.log('playout', playout)
        const response = await Login.getLogin(playout)
        console.log(response)
        commit('userInfo', response)
      } catch (error) {}
    }
  }
}
