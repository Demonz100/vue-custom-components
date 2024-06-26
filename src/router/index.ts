import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutView from '../layout/LayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutView,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/table',
          name: 'table',
          component: () => import('../views/TableShowcase.vue')
        },
        {
          path: '/select',
          name: 'select',
          component: () => import('../views/SelectView.vue')
        },
        {
          path: '/currency',
          name: 'currency',
          component: () => import('../views/CurrencyInputShowcase.vue')
        }
      ]
    },
  ]
})

export default router
