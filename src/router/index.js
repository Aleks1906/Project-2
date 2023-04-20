import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import ImprintView from '../views/ImprintView.vue'
import BeantwortenView from '../views/BeantwortenView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UmfragenErstellen from '../views/UmfragenErstellen.vue'
import UmfragenÜbersicht from '../views/UmfragenÜbersicht.vue'


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
  },
  {
    path: '/umfrageErstellen',
    name: 'umfrageErstellen',
    component: UmfragenErstellen
  },
  {
    path: '/umfragenÜbersicht',
    name: 'umfragenÜbersicht',
    component: UmfragenÜbersicht
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

