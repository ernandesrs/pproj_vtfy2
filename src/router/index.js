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
    component: () => import('@/layouts/admin/AdminLayout.vue'),
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
      },
      {
        path: 'perfil',
        name: 'admin.profile',
        component: () => import('@/views/admin/ProfileView.vue')
      },
      {
        path: 'usuarios',
        name: 'admin.users',
        component: () => import('@/views/admin/users/ListView.vue')
      },
      {
        path: 'usuarios/:user_id/mostrar',
        name: 'admin.users.show',
        component: () => import('@/views/admin/users/FormView.vue')
      },
      {
        path: 'usuarios/criar',
        name: 'admin.users.create',
        component: () => import('@/views/admin/users/FormView.vue')
      },
      {
        path: 'usuarios/:user_id/editar',
        name: 'admin.users.edit',
        component: () => import('@/views/admin/users/FormView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
