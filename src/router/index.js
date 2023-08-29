// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      }
    ],
  },
  {
    path: '/auth',
    component: () => import('@/layouts/auth/Layout.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/views/auth/LoginView.vue')
      },
      {
        path: 'register',
        name: 'auth.register',
        component: () => import('@/views/auth/RegisterView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
