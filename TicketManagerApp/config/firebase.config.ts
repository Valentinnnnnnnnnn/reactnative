//import { getAnalytics } from "firebase/analytics";
import firebaseConfig from '@/.env';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Initialize Firebase
const app = initializeApp(firebaseConfig)

//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
// Set persistence for Firebase Auth
// setPersistence(auth, indexedDBLocalPersistence);

//const analytics = getAnalytics(app);

export { app, auth };
