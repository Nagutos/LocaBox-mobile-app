import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import { isTokenExpired } from "@/utils/jwt";
import { decodeJwt } from "jose";
import { PushNotifications } from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import axios from "axios";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
/* import '@ionic/vue/css/palettes/dark.system.css'; */

/* Theme variables */
import "./theme/variables.css";
import { defineComponent } from "vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});

interface JwtPayload {
  exp: number; // Expiration du token (timestamp UNIX)
  user_data?: {
    // Objet contenant les infos de l'utilisateur
    id_user_box: number;
  };
}

// Initialisation des notifications push
PushNotifications.requestPermissions().then((permission) => {
  if (permission.receive === "granted") {
    PushNotifications.register();
  } else {
    console.error("Notification permission denied");
  }
});

// Obtenez le token pour envoyer des notifications push
export const setupFCMListener = async () => {
  console.log("🔄 Initialisation de setupFCMListener...");
  // await resetFCMToken();
  const permission = await PushNotifications.requestPermissions();
  if (permission.receive !== "granted") {
    console.warn("🚫 Permission de notification refusée.");
    return;
  }

  await PushNotifications.register();

  PushNotifications.addListener("registration", async (token: any) => {
    console.log("Token FCM reçu :", token.value);

    const jwtToken = localStorage.getItem("token");
    if (!jwtToken || isTokenExpired()) {
      console.warn("🚨 Token JWT expiré ou inexistant. Suppression du token.");
      localStorage.removeItem("token");
      return;
    }

    // Vérifie si Firebase enregistre correctement ce nouveau token
    if (!token.value) {
      console.error("🚨 Erreur : Aucun token reçu !");
      return;
    }

    try {
      const decoded = decodeJwt(jwtToken);
      const userId = Number(decoded.id_user_box);

      if (!userId) {
        console.error("❌ Impossible de récupérer l'ID utilisateur.");
        return;
      }
      const response = await axios.post(
        "https://ext.epid-vauban.fr/locabox-api/api/Auth/updateFCM",
        {
          fcm: token.value,
          id_user: userId,
        }
      );

      console.log("FCM mis à jour avec succès :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'envoi du token FCM:", error);
    }
  });

  PushNotifications.addListener("registrationError", (error) => {
    console.error("Erreur lors de l'enregistrement FCM :", error);
  });
};

export const resetFCMToken = async () => {
  try {
    console.log("🔄 Désenregistrement de FCM...");
    await PushNotifications.unregister(); // 🔥 Supprime l'ancien enregistrement

    console.log("✅ Réinscription FCM...");
    await PushNotifications.register(); // 🔄 Demande un nouveau token
  } catch (error) {
    console.error("❌ Erreur lors de la réinitialisation FCM :", error);
  }
};

// Obtenez le token pour envoyer des notifications push
export const deleteFCM = async () => {
  try {
    const jwtToken = localStorage.getItem("token");

    if (!jwtToken || isTokenExpired()) {
      console.warn("Token JWT expiré ou inexistant. Suppression du token.");
      localStorage.removeItem("token"); // Supprime le token expiré
      return;
    }

    const decoded = decodeJwt<JwtPayload>(jwtToken);

    if (!decoded || !decoded.id_user_box) {
      console.error("Impossible de récupérer l'ID utilisateur.");
      return;
    }

    const userId = Number(decoded.id_user_box);

    // Envoyer le token FCM au serveur
    const response = await axios.post(
      "https://ext.epid-vauban.fr/locabox-api/api/Auth/removeFCM",
      { id_user: userId }
    );

    console.log("FCM supprimé avec succès :", response.data);
  } catch (error) {
    console.error("Erreur lors de la suppression du token FCM :", error);
  }
};

// Écoute des notifications reçues
PushNotifications.addListener(
  "pushNotificationReceived",
  async (notification: any) => {
    console.log("Notification reçue:", notification);
    await LocalNotifications.schedule({
      notifications: [
        {
          title: notification.title || "Nouvelle notification",
          body: notification.body || "Vous avez une nouvelle notification",
          id: Math.floor(Math.random() * 10000),
          schedule: { at: new Date(Date.now() + 1000) }, // Affiche immédiatement
          sound: "default",
        },
      ],
    });
  }
);

// Écoute des notifications ouvertes
PushNotifications.addListener(
  "pushNotificationActionPerformed",
  (notification: any) => {
    console.log("Action sur notification:", notification);
  }
);

const app = createApp(App).use(IonicVue).use(router);

router.isReady().then(() => {
  app.mount("#app");
});
