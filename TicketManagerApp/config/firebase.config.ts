import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import firebaseConfig from '@/.env';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
//const analytics = getAnalytics(app);

export { app, auth };
