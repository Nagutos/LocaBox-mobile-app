<template>
  <ion-page>
    <AppHeader title="Codes" />
    <ion-content :fullscreen="true">
      <ion-card color="primary" v-for="(info, index) in data" :key="index">
        <ion-card-header>
          <ion-card-title>{{ info.name }} : Box {{ info.id_box }}</ion-card-title>
        </ion-card-header>
        <ion-card-subtitle>Fin de reservation : <br> {{ formatDate(info.end_reservation_date) }}</ion-card-subtitle>
        <ion-card-content class="code">Code : {{ info.current_code }}</ion-card-content>
      </ion-card>
      <ion-button class="refresh-button" @click="handleRefreshButton" :disabled="loading">
        <ion-icon :icon="reloadOutline"></ion-icon>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { IonPage, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonButton, toastController, IonIcon} from '@ionic/vue';
import { reloadOutline } from 'ionicons/icons';
import axios from 'axios';
import { ref,onMounted } from "vue";
import { decodeJwt } from 'jose';


//Définition du type pour TypeScript
interface Info {
  name: string;
  id_box: number;
  current_code: string;
  end_reservation_date: string;
}

//Déclaration du token JWT
const token = localStorage.getItem('token') ?? '';

//Déclaration du tableau data avec le bon type
const data = ref<Info[]>([]);
const loading = ref(true);

//Fonction pour récupérer les données depuis l'API
const fetchData = async () => {
  try {
    const user_data = decodeJwt(token);
    const response = await axios.get<{ name: string; id_box: number; current_code: string; end_reservation_date: string}[]>(
      `https://ext.epid-vauban.fr/locabox-api/api/main/code?id_user=${user_data["id_user_box"]}`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    data.value = response.data;
    console.log(data.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  } finally {
    loading.value = false;
  }
};

// Gestion du rafraîchissement
const handleRefreshButton = async () => {
  try {
    await fetchData();
    const toast = await toastController.create({
      message: 'Données mises à jour !',
      duration: 2000,
      position: 'middle',
      cssClass: 'custom-toast'
    });
    await toast.present();
  } catch (error) {
    const errorToast = await toastController.create({
      message: 'Erreur lors de la mise à jour des données.',
      duration: 3000,
      color: 'danger',
      position: 'middle',
      cssClass: 'custom-toast'
    });
    await errorToast.present();
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Date inconnue";

  try {
    // Remplacement de l'espace par 'T' pour éviter les erreurs de conversion
    const date = new Date(dateString.replace(" ", "T"));

    if (isNaN(date.getTime())) return "Format invalide";

    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }) + ` à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
  } catch (error) {
    console.error("Erreur de formatage de la date :", error);
    return "Erreur de formatage";
  }
};

//Exécuter fetchData() au montage du composant
onMounted(fetchData);
</script>

<style>
ion-content {
  --background: #eef5ff; /* Fond clair pour contraster avec les cartes */
  padding: 10px;
  min-height: 100vh; /* Assurer que le contenu est défilable */
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
  padding: 1px;
  font-weight: bold;
}

ion-card-subtitle {
  font-size: 1rem;
  font-weight: bold;
  color: #d32f2f; /* Rouge pour attirer l'attention */
  text-align: center;
  margin-top: 10px;
}

.refresh-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #4A90E2; /* Bleu pour correspondre au design */
  color: white;
  border-radius: 50%; /* Bouton rond */
  width: 60px; /* Taille du bouton */
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out, transform 0.2s;
}

/* Effet d'opacité quand le bouton est désactivé */
.refresh-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animation au clic */
.refresh-button:active {
  transform: scale(0.9);
}

/* Code affiché */
.code {
  font-size: 1.4rem;
  font-weight: bold;
  color: #0a3d62; /* Bleu plus foncé pour contraster */
}

.custom-toast {
  --background: white !important; /* Fond blanc */
  --color: black !important; /* Texte noir */
  --border-radius: 12px; /* Coins arrondis */
  --box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Ombre légère */
  --padding: 12px 16px; /* Ajoute un peu d’espace */
  text-align: center;
  font-weight: bold;
  --bottom: 80px !important; /* 🔥 Monte le toast au-dessus de la navbar */
  --width: 90%;
}

/* 🔹 Ajuste la position du toast pour qu'il soit au-dessus de la navbar */
.custom-toast .toast-wrapper {
  bottom: 80px !important; /* 🔥 Monte le toast au-dessus de la navbar */
  left: 50%;
  transform: translateX(-50%); /* Centre le toast */
  max-width: 90%;
  border-radius: 12px; /* Coins arrondis */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Ombre légère */
}

</style>