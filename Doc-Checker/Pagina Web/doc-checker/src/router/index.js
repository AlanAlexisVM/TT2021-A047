import Vue from 'vue'
import VueRouter from 'vue-router'
import Iniciodesesion from '../views/Iniciodesesion.vue'
import Registro from '../views/Registro.vue'
import Registropacientes from '../views/Registropacientes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Iniciodesesion',
    component: Iniciodesesion
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/registropacientes',
    name: 'Registropacientes',
    component: Registropacientes
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
