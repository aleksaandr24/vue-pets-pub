import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDeJtPM4f-zJm4_PVMt6bCOw6EBSezrBZU",
  authDomain: "vue-pets.firebaseapp.com",
  projectId: "vue-pets",
  storageBucket: "vue-pets.appspot.com",
  messagingSenderId: "390192624582",
  appId: "1:390192624582:web:50777cb3ff6f49a6b938c7"
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseStore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)