import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
/*import '@ionic/vue/css/palettes/dark.system.css';*/

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);


// Demander la permission et planifier une notification
LocalNotifications.requestPermissions().then(permission => {
  if (permission.display === 'granted') {
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Bienvenue !',
          body: 'Votre application est prête.',
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) }, // Après 1s
        }
      ]
    });
  }
});

// Initialisation des notifications push
PushNotifications.requestPermissions().then(permission => {
  if (permission.receive === 'granted') {
    PushNotifications.register();
  } else {
    console.error('Notification permission denied');
  }
});

// Obtenez le token pour envoyer des notifications push
PushNotifications.addListener('registration', (token: any) => {
  console.log('Token de notification push:', token.value);
});

// Écoute des notifications reçues
PushNotifications.addListener('pushNotificationReceived', (notification: any) => {
  console.log('Notification reçue:', notification);
});

// Écoute des notifications ouvertes
PushNotifications.addListener('pushNotificationActionPerformed', (notification: any) => {
  console.log('Action sur notification:', notification);
});

router.isReady().then(() => {
  app.mount('#app');
});
