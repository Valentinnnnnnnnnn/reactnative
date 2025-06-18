//import { getAnalytics } from "firebase/analytics";
import firebaseConfig from '@/.env'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
// Set persistence for Firebase Auth
// setPersistence(auth, indexedDBLocalPersistence);

//const analytics = getAnalytics(app);

export { app, auth }
