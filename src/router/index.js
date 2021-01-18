import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import sort from '../views/sort.vue'
import topic from '../views/topic.vue'
import currentsort from '../views/currentsort.vue'
import goodDetail from '../views/goodDetail.vue'
import cart from '../views/cart.vue'

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
  },
  {
    path:'/topic',
    name:'topic',
    component:topic
  },
  {
    path:'/sort/:id',
    name:"sortid",
    props:function(route){
      return{
        id:route.params.id
      }
    },
    component:currentsort
  },
  {
    path:'/goodDetail/:id',
    name:'goodDetail',
    props:function(route){
      return{
        id:route.params.id
      }
    },
    component:goodDetail
  },
  {
    path:'/cart',
    name:'cart',
    component:cart
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
