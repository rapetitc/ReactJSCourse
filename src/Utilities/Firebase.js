import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

export const storage = getStorage(app);

const storageRef = ref(storage, "images/");

export const uploadImages = (file) => {
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot);
  });
};


getDownloadURL(storageRef)
  .then((url) => {
    // Insert url into an <img> tag to "download"
    console.log(url);
  })