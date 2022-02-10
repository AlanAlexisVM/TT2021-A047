import Vue from 'vue'
import VueRouter from 'vue-router'
import Iniciodesesion from '../views/Iniciodesesion.vue'
import Registro from '../views/Registro.vue'
import Registropacientes from '../views/Registropacientes.vue'
import Registropacientes2 from '../views/Registropacientes2.vue'
import Home from '../views/Home.vue'
import Informe from '../views/Informe.vue'
import Buscador from '../views/Buscador.vue'
import Configuracion from '../views/Configuracion.vue'
import Pacientes from '../views/Pacientes.vue'
import Signos from '../views/Signos.vue'
import Mineria from '../views/Mineria.vue'

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
    path: '/Home',
    component: Home,
    children:[
      {
        path:'/pacientes',
        name:'Pacientes',
        component: Pacientes
      },
      {
        path: '/informe',
        name: 'Informe',
        component: Informe
      },
      {
        path: '/buscador',
        name: 'Buscador',
        component: Buscador
      },
      {
        path: '/configuracion',
        name: 'Configuracion',
        component: Configuracion
      },
      {
        path: '/registropacientes',
        name: 'Registropacientes',
        component: Registropacientes
      },
      {
        path: '/registropacientes2',
        name: 'Registropacientes2',
        component: Registropacientes2
      },
      {
        path: '/signos',
        name: 'Signos',
        component: Signos
      },
      {
        path: '/mineria',
        name: 'Mineria',
        component: Mineria
      }
    ]
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
