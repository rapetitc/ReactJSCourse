import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_zM6BY2pjkwmQbx4ewgurHcZv_dVpK4k",
  authDomain: "freemarket-90a08.firebaseapp.com",
  projectId: "freemarket-90a08",
  storageBucket: "freemarket-90a08.appspot.com",
  messagingSenderId: "154932139377",
  appId: "1:154932139377:web:cee645c683186ff23692d0",
  measurementId: "G-VPPD33SZM6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
