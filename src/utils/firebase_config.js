import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6BxxwmGUpJ1FtsuOnfYiUP-kcviJGA0M",
  authDomain: "reactjscourse-134a0.firebaseapp.com",
  projectId: "reactjscourse-134a0",
  storageBucket: "reactjscourse-134a0.firebasestorage.app",
  messagingSenderId: "1055477405508",
  appId: "1:1055477405508:web:b9812836b9610c36dc2911",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
