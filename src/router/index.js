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
    component: () => import('@/layouts/auth/AuthLayout.vue'),
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
      },
      {
        path: 'forget',
        name: 'auth.forget',
        beforeEnter: [middlewares.redirectIf.authenticated],
        component: () => import('@/views/auth/ForgetView.vue')
      },
      {
        path: 'update-password',
        name: 'auth.updatePassword',
        beforeEnter: [middlewares.redirectIf.authenticated],
        component: () => import('@/views/auth/UpdatePasswordView.vue')
      },
      {
        path: 'verify-account',
        name: '',
        beforeEnter: [middlewares.redirectIf.unauthenticated],
        component: () => import('@/views/auth/VerifyAccount.vue')
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
        beforeEnter: [
          middlewares.authorization.listAccess
        ],
        component: () => import('@/views/admin/users/ListView.vue')
      },
      {
        path: 'usuarios/:user_id/mostrar',
        name: 'admin.users.show',
        beforeEnter: [
          middlewares.authorization.showAccess
        ],
        component: () => import('@/views/admin/users/FormView.vue')
      },
      {
        path: 'usuarios/criar',
        name: 'admin.users.create',
        beforeEnter: [
          middlewares.authorization.createAccess
        ],
        component: () => import('@/views/admin/users/FormView.vue')
      },
      {
        path: 'usuarios/:user_id/editar',
        name: 'admin.users.edit',
        beforeEnter: [
          middlewares.authorization.updateAccess
        ],
        component: () => import('@/views/admin/users/FormView.vue')
      },
      {
        path: 'funcoes',
        name: 'admin.roles',
        beforeEnter: [
          middlewares.authorization.listAccess
        ],
        component: () => import('@/views/admin/roles/ListView.vue'),
      },
      {
        path: 'funcoes/:role_id/mostrar',
        name: 'admin.roles.show',
        beforeEnter: [
          middlewares.authorization.showAccess
        ],
        component: () => import('@/views/admin/roles/FormView.vue')
      },
      {
        path: 'funcoes/criar',
        name: 'admin.roles.create',
        beforeEnter: [
          middlewares.authorization.createAccess
        ],
        component: () => import('@/views/admin/roles/FormView.vue')
      },
      {
        path: 'funcoes/:role_id/editar',
        name: 'admin.roles.edit',
        beforeEnter: [
          middlewares.authorization.updateAccess
        ],
        component: () => import('@/views/admin/roles/FormView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
