import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import About from '@/views/About.vue'
import Category from '@/views/Category.vue'
import Contact from '@/views/Contact.vue'
import Entry from '@/views/Entry.vue'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const guardValidEntry = (to, from, next) => {
  const entry = store.getters.entry(to.params.id)
  if (entry) next()
  else next('/not-found')
}

const guardValidCategory = (to, from, next) => {
  const category = store.getters.category(to.params.id)
  if (category) next()
  else next('/not-found')
}

const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}

Entry.beforeRouteEnter = guardValidEntry
Entry.beforeRouteUpdate = guardValidEntry
Category.beforeRouteEnter = guardValidCategory
Category.beforeRouteUpdate = guardValidCategory

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/entry/:id',
    name: 'entry',
    component: Entry
  },
  {
    path: '/category/:id',
    name: 'category',
    component: Category
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '*',
    redirect: 'not-found'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior
})

export default router
