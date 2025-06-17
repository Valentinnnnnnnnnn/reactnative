import { auth } from "@/config/firebase.config";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export async function signIn(email: string, password: string): Promise<UserCredential> {
    if (!email || !password) {
        throw new Error('Email and password must be provided');
    }

    const userCredential: UserCredential =  await signInWithEmailAndPassword(auth, email, password)
    if (!userCredential) {
        throw new Error('Sign in failed');
    }
    console.log('User signed in:', userCredential.user);
    const router = useRouter()
    router.push('/home')
    return userCredential;

}