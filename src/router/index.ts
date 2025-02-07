import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Vérifie si le token existe
  return !!token; // Retourne true si un token est présent, sinon false
};


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
          console.log('Route cible (to)', to);
          console.log('Route précédente (from)', from);
          if (!isAuthenticated()) {
            next('/tabs/login'); // Redirige vers la connexion si pas connecté
          } else {
            next(); // Continue vers /tabs/codes
          }
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
