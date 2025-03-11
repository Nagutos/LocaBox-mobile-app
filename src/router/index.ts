import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated, isTokenExpired } from '@/utils/jwt'
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/codes'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/login'
      },
      {
        path: 'login',
        component: () => import('@/views/VueLogin.vue') // Page de connexion (accessible sans être connecté)
      },
      {
        path: 'codes',
        component: () => import('@/views/VueCodes.vue'),
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated() || isTokenExpired()) {
            localStorage.removeItem('token'); // Supprime le token expiré
            next('/tabs/login'); // Redirige vers login
          } else {
            next(); // Continue vers /tabs/codes
          }
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
