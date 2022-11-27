import { firebaseAuth } from '@/firebase'
import {
  setPersistence, 
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const firebaseRegister = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    return userCredential
  } catch(e) {
    console.error(e)
  }
}

export const firebaseSignIn = async (email, password) => {
  try {
    await setPersistence(firebaseAuth, browserSessionPersistence)
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
    return userCredential
  } catch(e) {
    console.error(e)
  }
}

export const firebaseSignOut = async () => {
  try {
    await signOut(firebaseAuth)
  } catch(e) {
    console.error(e)
  }
}