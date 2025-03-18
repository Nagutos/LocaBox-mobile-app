<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted } from "vue";
import { setupFCMListener } from "@/main";

onMounted(() => {
  setupFCMListener(); // 🔥 Démarre le listener FCM après le montage du composant
});
</script>
