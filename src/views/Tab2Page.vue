<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Codes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card color="primary" v-for="(data, index) in datas" :key="index">
        <ion-card-header>
          <ion-card-title>Bâtiment {{data.Batiment}} : Box {{data.BoxNumber}}</ion-card-title>
          <ion-card-title></ion-card-title>
        </ion-card-header>
        <ion-card-content class="code">Code : {{data.code}}</ion-card-content>
      </ion-card>
    </ion-content>
    <ExploreContainer name="Tab 2 page" />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
// import axios from 'axios';
let datas = [
  {Batiment:"C",BoxNumber:"5",code:"542369"},
  {Batiment:"D",BoxNumber:"1",code:"123456"},
  {Batiment:"T21",BoxNumber:"3",code:"1945"},
];

// const data = ref([]);
// const error = ref(null);
// const loading = ref(true);

// const fetchData = async () => {
//   const token = localStorage.getItem('token'); // Récupérer le JWT
//   try {
//     const response = await axios.get('https://api.example.com/protected-route', {
//       headers: {
//         Authorization: `Bearer ${token}` // Ajouter le JWT dans le header
//       }
//     });
//     data.value = response.data;
//   } catch (err) {
//     error.value = 'Erreur de chargement des données';
//     console.error('Erreur:', err);
//   } finally {
//     loading.value = false;
//   }
// };




</script>

<style>
.code{
  font-size: x-large;
  font-weight: bold;
}
</style>