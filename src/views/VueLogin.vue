<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Connexion</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-title class="title">LocaBox</ion-title>
        <br>
        <ion-input
          v-model="email"
          label="Email"
          type="email"
          label-placement="floating"
          fill="outline"
        ></ion-input>
        <br>
        <ion-input
          v-model="password"
          label="Mot de passe"
          type="password"
          label-placement="floating"
          fill="outline"
        ></ion-input>
        <br />
        <ion-button @click="handleLogin" shape="round" class="centered-button">
          Connexion
        </ion-button>
        <ion-text v-if="errorMessage" class="error" color="danger">
          {{ errorMessage }}
        </ion-text>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonText, IonGrid} from '@ionic/vue';
  import { ref } from "vue";
  import { useRouter } from 'vue-router';; 
  import axios from 'axios';

// Déclaration réactive des variables
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Fonction de connexion
const handleLogin = async () => {
  try {
    if (!email.value.trim() || !password.value.trim()) {
      errorMessage.value = "Veuillez remplir tous les champs.";
      return;
    }

    // Vérification du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      errorMessage.value = "Email non valide.";
      return;
    }

    // Requête API
    const response = await axios.post('http://localhost/LocaBox/api/auth/login', {
      email: email.value,
      password: password.value
    });

    // Stocker le token JWT
    const token = response.data.token;
    localStorage.setItem('token', token);

    // Redirection après connexion
    router.push('/tabs/codes');
    errorMessage.value = "";

  } catch (error) {
    console.error("Erreur lors de la récupération du JWT:", error);
    errorMessage.value = "Email ou mot de passe incorrect.";
  }
};
</script>

<style scoped>
ion-input{
  display: flex;
  justify-content: center; /* Centrer horizontalement */
  align-items: center;     /* Centrer verticalement */
}

ion-grid{
  display: block;
  margin-top: 50%;
}

.title{
  margin-top: 20px;
  text-align: center;
  font-size: xxx-large;
  font-weight: bold;
  background-image: linear-gradient(to right, rgb(3, 238, 3), blue); /* Dégradé du vert au bleu */
  -webkit-background-clip: text;  /* Applique le dégradé au texte */
  color: transparent; /* Rendre le texte transparent pour voir le dégradé */
}

.centered-button {
  display: flex;
  justify-content: center; /* Centrer horizontalement */
  align-items: center;     /* Centrer verticalement */
}

.error{
  padding-top: 10px;
  display: flex;
  justify-content: center; /* Centrer horizontalement */
  align-items: center;     /* Centrer verticalement */
  font-size: large;
  font-weight: bolder;
  color: rgb(225, 20, 20);
}

ion-button {
  --padding-top: 15px;
  --padding-bottom: 15px;
}
</style>