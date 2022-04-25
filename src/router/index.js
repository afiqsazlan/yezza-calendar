import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalendarView from "@/views/CalendarView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  },
  {
    path: '/request',
    name: 'request',
    redirect: {name: 'calendar'}
  },
  {
    path: '/client',
    name: 'client',
    redirect: {name: 'calendar'}
  },
  {
    path: '/menu',
    name: 'menu',
    redirect: {name: 'calendar'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
