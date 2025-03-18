<template>
  <IonPage v-bind="$attrs">
    <IonContent>
      <AppHeader title="Autres" />
      <ion-card class="other_card">
        <ion-card-header>
          <ion-card-title>LocaBox APP</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item lines="none">
              <ion-icon slot="start" :icon="informationCircle"></ion-icon>
              <IonLabel>
                <h1>Version</h1>
                <p>1.0.0</p>
              </IonLabel>
            </ion-item>

            <ion-item
              button
              href="https://github.com/Nagutos/LocaBox-mobile-app"
              lines="none"
            >
              <ion-icon slot="start" :icon="logoGithub"></ion-icon>
              <ion-label>
                <h1>Github</h1>
              </ion-label>
            </ion-item>

            <ion-item lines="none">
              <ion-icon slot="start" :icon="documentTextOutline"></ion-icon>
              <ion-label>
                <h1>Licences</h1>
                <p>GPL v3</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card class="other_card">
        <ion-card-header>
          <ion-card-title>Développeur</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item lines="none">
              <ion-icon slot="start" :icon="person"></ion-icon>
              <IonLabel>
                <p>RYCKEBUSCH Maxime</p>
              </IonLabel>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonContent,
} from "@ionic/vue";
import AppHeader from "@/components/AppHeader.vue";
import {
  informationCircle,
  person,
  logoGithub,
  documentTextOutline,
} from "ionicons/icons";
</script>

<style>
.other_card {
  background: whitesmoke;
}
</style>
