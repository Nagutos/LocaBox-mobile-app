import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { isAuthenticated, isTokenExpired } from "@/utils/jwt";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/codes",
  },
  {
    path: "/tabs",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/login", // Redirection vers la page de login si aucune route définie
      },
      {
        path: "login",
        component: () => import("@/views/VueLogin.vue"),
      },
      {
        path: "codes", // Route pour les codes
        component: () => import("@/views/VueCodes.vue"),
        beforeEnter: (to, from, next) => {
          if (!isAuthenticated() || isTokenExpired()) {
            localStorage.removeItem("token");
            next("/tabs/login");
          } else {
            next();
          }
        },
      },
      {
        path: "other", // Route pour les autres pages
        component: () => import("@/views/VueOther.vue"),
      },
      {
        path: "/refresh",
        redirect: "/",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
