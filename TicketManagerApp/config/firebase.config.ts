//import { getAnalytics } from "firebase/analytics";
import firebaseConfig from '@/.env'

import { initializeApp } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//const auth = getAuth(app);
const auth = initializeAuth(app)

//const analytics = getAnalytics(app);

export { app, auth }
