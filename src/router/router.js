import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Todos from '../views/Todos.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: Todos,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true

    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})

export default router