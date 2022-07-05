import { createRouter, createWebHashHistory } from 'vue-router'
import user from '../views/user'

const routes = [
  {
    path: '/',
    name: 'user',
    component: user
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
