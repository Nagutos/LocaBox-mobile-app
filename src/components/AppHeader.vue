<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ props.title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="handleLogout" :disabled="!isAuthenticated()">
          <ion-icon :icon="logOutOutline" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  toastController,
} from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import { isTokenExpired, isAuthenticated } from "@/utils/jwt";
// import { deleteFCM } from "@/main";

// Accepter un titre en prop
const props = defineProps<{ title: string }>();
const router = useRouter();

// Déconnexion
const handleLogout = async () => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired()) {
    const toast = await toastController.create({
      message: "Vous n'êtes pas connecté. Impossible de vous déconnecter.",
      duration: 2000,
      position: "middle",
      cssClass: "custom-toast",
    });
    await toast.present();
    console.error("Vous n'êtes pas authentifié.");
    return;
  }

  try {
    localStorage.removeItem("token");
    localStorage.clear();
    router.push("/tabs/login");
    const toast = await toastController.create({
      message: "Vous vous êtes déconnecté avec succès.",
      duration: 2000,
      position: "middle",
      cssClass: "custom-toast",
    });
    await toast.present();
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};
</script>

<style>
ion-button {
  color: rgb(0, 84, 233);
}
</style>
