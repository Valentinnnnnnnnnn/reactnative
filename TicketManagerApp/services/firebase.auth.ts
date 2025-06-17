import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../config/firebase.config'

const auth = getAuth(app)

export async function signIn(email: string, password: string): Promise<void> {
  if (!email || !password) {
    throw new Error('Email and password must be provided')
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { user: userCredential.user, status: 'success' }
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      return Promise.reject({
        code: errorCode,
        message: errorMessage,
        status: 'error',
      })
    })
}
