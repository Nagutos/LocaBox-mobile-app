import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXCWNH1I4nVXrUT_6ArjExpR0A-vEcsgE",
  authDomain: "locabox-bfb0f.firebaseapp.com",
  projectId: "locabox-bfb0f",
  storageBucket: "locabox-bfb0f.appspot.com",
  messagingSenderId: "523024269629",
  appId: "1:523024269629:web:6535817d4a4819471d4554",
  measurementId: "G-XXXXXXX" // Optionnel pour certains cas, uniquement si vous avez activé Google Analytics
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Ecouter les messages en avant-plan
onMessage(messaging, (payload) => {
  console.log("Message reçu au premier plan:", payload);
});

