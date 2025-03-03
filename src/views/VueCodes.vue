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
    const response = await axios.get<{ name: string; id_box: number; current_code: string }[]>(
      `https://ext.epid-vauban.fr/locabox-api/api/main/code?id_user=${user_data["id_user_box"]}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    data.value = response.data;
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
ion-content {
  --background: #eef5ff; /* Fond clair pour contraster avec les cartes */
  padding: 10px;
}

/* Style des cartes */
ion-card {
  background: linear-gradient( #89CFF0, #4A90E2); /* Dégradé bleu clair à bleu profond */
  color: #1b3a57; /* Bleu foncé pour un bon contraste */
  border-radius: 15px; /* Coins arrondis */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Ombre douce */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 15px; /* Espacement entre les cartes */
}

/* En-tête des cartes */
ion-card-header {
  background: rgba(255, 255, 255, 0.4); /* Léger effet de transparence */
  padding: 10px 15px;
  border-radius: 15px 15px 0 0;
}

/* Titre */
ion-card-title {
  font-size: 1.3rem;
  text-align: center;
  font-weight: bolder;
}

/* Contenu des cartes */
ion-card-content {
  font-size: 1.1rem;
  text-align: center;
  padding: 15px;
  font-weight: bold;
}

/* Code affiché */
.code {
  margin-top: 10px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #0a3d62; /* Bleu plus foncé pour contraster */
}
</style>