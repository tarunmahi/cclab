// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "your-api-key",
//     authDomain: "your-auth-domain",
//     projectId: "your-project-id",
//     storageBucket: "your-storage-bucket",
//     messagingSenderId: "your-messaging-sender-id",
//     appId: "your-app-id",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const firebaseConfig = {
    apiKey: "AIzaSyDWe7j0M89wupFfwhFUkJwTGf92HbbrXS4",
    authDomain: "fir-apk-e5d86.firebaseapp.com",
    databaseURL: "https://fir-apk-e5d86-default-rtdb.firebaseio.com",
    projectId: "fir-apk-e5d86",
    storageBucket: "fir-apk-e5d86.firebasestorage.app",
    messagingSenderId: "1070451636448",
    appId: "1:1070451636448:web:fb29cf13babc2a5441f885",
    measurementId: "G-KRDJHNBC8V"
  };
  const app=initializeApp(firebaseConfig);
  const db = getFirestore(app);
export default db;
