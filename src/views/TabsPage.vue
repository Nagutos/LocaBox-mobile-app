<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar
        slot="bottom"
        class="footer-bar"
        :class="{ 'hidden-footer': isFooterHidden }"
      >
        <ion-tab-button tab="login" href="/tabs/login">
          <ion-icon :icon="person" />
          <ion-label>Connexion</ion-label>
        </ion-tab-button>
        <ion-tab-button
          tab="codes"
          href="/tabs/codes"
          :disabled="!isAuthenticated()"
        >
          <ion-icon :icon="key" />
          <ion-label>Codes</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="other" href="/tabs/other">
          <ion-icon :icon="ellipsisHorizontal" />
          <ion-label>Autres</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { ellipsisHorizontal, key, person } from "ionicons/icons";
import { ref, onMounted, onUnmounted } from "vue";
import { isAuthenticated } from "@/utils/jwt";

const isFooterHidden = ref(false);

// Fonction pour détecter le scroll
const handleScroll = () => {
  const currentScroll = window.scrollY;
  isFooterHidden.value = currentScroll > 50; // Cache le footer si on scrolle vers le haut
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Footer adaptatif */
.footer-bar {
  transition: transform 0.3s ease-in-out;
  background: rgba(
    255,
    255,
    255,
    0.9
  ); /* Transparence pour effet plus moderne */
}

/* Cacher le footer en scrollant */
.hidden-footer {
  transform: translateY(100%);
}

/* Responsive design */
@media (max-width: 600px) {
  .footer-bar {
    font-size: 14px;
    padding-bottom: 20px;
  }
}

@media (min-width: 600px) {
  .footer-bar {
    font-size: 16px;
    padding-bottom: 15px;
  }
}
</style>
