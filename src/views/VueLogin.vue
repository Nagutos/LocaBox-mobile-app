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
        <!-- Email Input (lié à email) -->
        <ion-input
          :value="email"
          @ionInput="(e: InputEvent) => email = (e.target as HTMLInputElement).value"
          label="Email"
          type="email"
          label-placement="floating"
          fill="outline"
        ></ion-input>
        <br />

        <!-- Password Input (lié à password) -->
        <ion-input
          :value="password"
          @ionInput="(e: InputEvent) => password = (e.target as HTMLInputElement).value"
          label="Mot de passe"
          type="password"
          label-placement="floating"
          fill="outline"
        ></ion-input>
        <br />

        <!-- Connexion Button -->
        <ion-button @click="handleLogin" shape="round" class="centered-button">
          Connexion
        </ion-button>

        <!-- Error Message -->
        <ion-text v-if="errorMessage" class="error" color="danger">
          {{ errorMessage }}
        </ion-text>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/vue';
  import { ref } from "vue";
  import { useRouter } from 'vue-router';; 
  import axios from 'axios';

// Déclaration réactive des variables
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Fonction pour afficher les valeurs
const handleLogin = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    errorMessage.value = "Veuillez remplir tous les champs.";
    console.log("Erreur: Un champ est vide !");
    return;
  }
  if(email.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
    try {
      // Récupère le JWT
      const response = await axios.post('http://localhost/LocaBox/api/auth/login', {
        email: email.value,
        password: password.value
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push('/tabs/codes');
      errorMessage.value = "";
    } catch (error) {
      console.error("Erreur lors de la récuperation du JWT:", error);
      errorMessage.value = "Email ou mots de passe incorrect.";
    }
  }else{
    errorMessage.value = "Email non valide.";
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