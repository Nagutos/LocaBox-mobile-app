<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openPopover($event)">
            <ion-icon :icon="ellipsisVertical" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  
    <!-- Popover -->
    <ion-popover
      :is-open="popoverOpen"
      :event="popoverEvent"
      @didDismiss="popoverOpen = false"
      :show-backdrop="false" 
      :dismiss-on-select="true"
       side="bottom"
       alignment="center"
    >
    <ion-content class="popover-content">
        <ion-list>
          <ion-item button @click="handleLogout">
            <ion-label>Déconnexion</ion-label>
            <ion-icon slot="start" :icon="logOutOutline" />
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from "vue";
  import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonPopover, IonContent, IonList, IonItem, IonLabel, IonIcon } from "@ionic/vue";
  import { ellipsisVertical, logOutOutline } from "ionicons/icons";
  import { useRouter } from "vue-router";
  import { deleteFCM } from '@/main';
  import { isTokenExpired } from '@/utils/jwt'
  
  // Accepter un titre en prop
  const props = defineProps<{ title: string }>();
  
  const router = useRouter();
  const popoverOpen = ref(false);
  const popoverEvent = ref<Event | null>(null);
  
  // Ouvrir le popover
  const openPopover = (event: Event) => {
    popoverEvent.value = event;
    popoverOpen.value = true;
  };
  
  // Déconnexion
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if(!token || isTokenExpired()){
      console.error("Vous n'êtes pas authentifier.")
      return;
    }else{
      try{
        deleteFCM();
        localStorage.removeItem("token");
        popoverOpen.value = false;
        router.push("/tabs/login");
      }
      catch (error) {
        console.error("Erreur lors de la récupération du JWT:", error);
      }
    }
  };

  </script>
  
  <style scoped>
  ion-header {
    --background: #4A90E2;
    color: white;
  }
  
  ion-title {
    font-size: 1.4rem;
  }
  
  ion-button {
    color: rgb(0, 84, 233);
  }
  
    ion-popover {
        --height: initial !important; /* Ajuste la hauteur automatiquement */
        --width: auto !important;
        --max-width: 200px;
        --border-radius: 10px;
        --box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        --background: white;
        overflow: hidden !important; /* Empêche le dépassement du contenu */
    }

    .popover-content {
        --padding: 0; 
        min-height: 0px;
        overflow: hidden;
    }

    ion-popover::part(content) {
        overflow: hidden !important;
    }

    ion-item {
        --min-height: 40px; /* Ajuste si nécessaire */
        padding: 0; /* Supprime le padding interne */
    }
  </style>
  