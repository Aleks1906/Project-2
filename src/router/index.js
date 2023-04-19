import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import ImprintView from '../views/ImprintView.vue'
import BeantwortenView from '../views/BeantwortenView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexView
  },
  {
    path: '/imprint',
    name: 'imprint',
    component: ImprintView
  },
  {
    path: '/beantworten',
    name: 'beantworten',
    component: BeantwortenView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

