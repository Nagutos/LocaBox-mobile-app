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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import axios from 'axios';
import { ref,onMounted } from "vue";
import { decodeJwt } from 'jose';

const token = localStorage.getItem('token') ?? '';
const data = ref([]);
const error = ref(null);
const loading = ref(true);

const fetchData = async () => {
  let user_data = decodeJwt(token);
  console.log(user_data);
  try {
    const response = await axios.get('http://localhost/LocaBox/api/main/code?id_user=' + user_data["id_user_box"], {
      headers: {
        Authorization: `Bearer ${token}` // Ajouter le JWT dans le header
      }
    });
    data.value = response.data;
    console.log("Données dans la fonction",data.value)
    return data.value
  } catch (error) {
      console.error('Erreur:', error);
  } finally {
      loading.value = false;
  }
};

onMounted(() => {
    fetchData(); // Exécuter la fonction au montage du composant
  });
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