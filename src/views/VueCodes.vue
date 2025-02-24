<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Codes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card color="primary" v-for="(info, index) in data" :key="index">
        <ion-card-header>
          <ion-card-title>Bâtiment {{info.name}} : Box {{info.id_box}}</ion-card-title>
        </ion-card-header>
        <ion-card-content class="code">Code : {{info.current_code}}</ion-card-content>
      </ion-card>
    </ion-content>
    <ExploreContainer name="Tab 2 page" />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import axios from 'axios';
import { ref,onMounted } from "vue";
import { decodeJwt } from 'jose';

//Définition du type pour TypeScript
interface Info {
  name: string;
  id_box: number;
  current_code: string;
}

//Déclaration du token JWT
const token = localStorage.getItem('token') ?? '';

//Déclaration du tableau data avec le bon type
const data = ref<Info[]>([]);
const loading = ref(true);

//Fonction pour récupérer les données depuis l'API
const fetchData = async () => {
  try {
    let user_data = decodeJwt(token);
    console.log("Données utilisateur:", user_data);
    const response = await axios.get<{ name: string; id_box: number; current_code: string }[]>(
      `http://localhost/LocaBox/api/main/code?id_user=${user_data["id_user_box"]}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    data.value = response.data;
    console.log("Données reçues :", data.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  } finally {
    loading.value = false;
  }
};

//Exécuter fetchData() au montage du composant
onMounted(fetchData);
</script>

<style>
.code {
  font-size: x-large;
  font-weight: bold;
}

.loading-message {
  text-align: center;
  font-size: 1.5em;
  color: #007bff;
}

.error-message {
  text-align: center;
  font-size: 1.5em;
  color: red;
}

ion-card {
  margin-bottom: 10px;
}
</style>