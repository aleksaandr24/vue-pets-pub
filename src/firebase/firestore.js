import { firebaseStore } from '@/firebase'
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

export const firestoreGetDocs = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(firebaseStore, collectionName))
    const result = {}
    querySnapshot.forEach((doc) => result[doc.id] = doc.data())
    if (Object.keys(result).length > 0) return result
    throw new Error(`The ${collectionName} collection has no entries`)
  } catch(e) {
    console.error(e)
  }
}

export const firestoreGetSubDocs = async (collectionName, documentID, subCollectionName) => {
  try {
    const subDocsRef = collection(firebaseStore, collectionName, documentID, subCollectionName)
    const querySnapshot = await getDocs(subDocsRef)
    const result = {}
    querySnapshot.forEach((doc) => result[doc.id] = doc.data())
    if (Object.keys(result).length > 0) return result
    throw new Error(`The ${collectionName} collection has no entries`)
  } catch(e) {
    console.error(e)
  }
}

export const firestoreGetDoc = async (collectionName, documentID) => {
  try {
    const docRef = doc(firebaseStore, collectionName, documentID)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data()
    throw new Error(`Firestore: the ${documentID} does not exist in ${collectionName} collection`)
  } catch(e) {
    console.error(e)
  }
}

export const firestoreGetUser = async (uid) => {
  return await firestoreGetDoc('users', uid)
}

export const firestoreAddDoc = async (collectionName, documentData) => {
  try {
    const docRef = collection(firebaseStore, collectionName)
    return await addDoc(docRef, documentData)
  } catch(e) {
    console.error(e)
  }
}

export const firestoreAddSubDoc = async (collectionName, documentID, subCollectionName, documentData) => {
  try {
    const subDocsRef = collection(firebaseStore, collectionName, documentID, subCollectionName)
    return await addDoc(subDocsRef, documentData)
  } catch(e) {
    console.error(e)
  }
}

export const firestoreUpdateDoc = async (collectionName, documentID, documentData) => {
  try {
    const docRef = doc(firebaseStore, collectionName, documentID)
    return await updateDoc(docRef, documentData)
  } catch(e) {
    console.error(e)
  }
}

export const firestoreSetDoc = async (collectionName, documentID, documentData) => {
  try {
    const docRef = doc(firebaseStore, collectionName, documentID)
    return await setDoc(docRef, documentData)
  } catch(e) {
    console.error(e)
  }
}

export const firestoreDeleteDoc = async (collectionName, documentID) => {
  try {
    const docRef = doc(firebaseStore, collectionName, documentID)
    await deleteDoc(docRef)
  } catch(e) {
    console.error(e)
  }
}

export const firestoreDeleteSubDoc = async (collectionName, documentID, subCollectionName, subDocumentID) => {
  try {
    const docRef = doc(firebaseStore, collectionName, documentID, subCollectionName, subDocumentID)
    await deleteDoc(docRef)
  } catch(e) {
    console.error(e)
  }
}