import { createStore } from 'vuex'
import getters from './getters'
import user from './models/user'

export default createStore({
  getters,
  modules: {
    user
  }
})
