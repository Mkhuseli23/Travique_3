import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-X5M6HILMlPOwHkZuYp3PN3BeOyFuhKw",
  authDomain: "travique3.firebaseapp.com",
  projectId: "travique3",
  storageBucket: "travique3.appspot.com",
  messagingSenderId: "928022136161",
  appId: "1:928022136161:web:1d23d39c6528771d9c3120"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, db, googleProvider, storage };
