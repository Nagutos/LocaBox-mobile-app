<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="login" href="/tabs/login">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Connexion</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="codes" href="/tabs/codes" :disabled="!isAuthenticated()">
          <ion-icon aria-hidden="true" :icon="key" />
          <ion-label>Codes</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>

</template>

<script setup lang="ts">
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { key, person } from 'ionicons/icons';

  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Vérifie si le token existe
  };
</script>
