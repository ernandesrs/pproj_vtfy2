// Composables
import { createRouter, createWebHistory } from 'vue-router'
import middlewares from '@/core/middlewares'

const routes = [
  // /
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      }
    ],
  },

  // /auth
  {
    path: '/auth',
    component: () => import('@/layouts/auth/Layout.vue'),
    beforeEnter: [
      middlewares.configurator.inAuth
    ],
    children: [
      {
        path: 'login',
        name: 'auth.login',
        beforeEnter: [middlewares.redirectIf.authenticated],
        component: () => import('@/views/auth/LoginView.vue')
      },
      {
        path: 'register',
        name: 'auth.register',
        beforeEnter: [middlewares.redirectIf.authenticated],
        component: () => import('@/views/auth/RegisterView.vue')
      }
    ]
  },

  // /admin
  {
    path: '/admin',
    component: () => import('@/layouts/admin/Layout.vue'),
    beforeEnter: [
      middlewares.redirectIf.unauthenticated,
      middlewares.authorization.adminAccess,
      middlewares.configurator.inAdmin
    ],
    children: [
      {
        path: '',
        name: 'admin.home',
        component: () => import('@/views/admin/HomeView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
