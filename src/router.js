import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import AddLink from './views/AddLink.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/link/:id', component: Detail },
  { path: '/add', component: AddLink }
]

export default new VueRouter({
  mode: 'history',
  routes
})