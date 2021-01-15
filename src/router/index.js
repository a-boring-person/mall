import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import sort from '../views/sort.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/home',
    name:'Home',
    component:Home
  },
  {
    path:'/sort',
    name:'sort',
    component:sort 
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
