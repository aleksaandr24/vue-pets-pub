import { firestoreDeleteDoc,
        firestoreDeleteSubDoc,
        firestoreGetDoc, 
        firestoreGetSubDocs, 
        firestoreGetUser,
        firestoreUpdateDoc} from '@/firebase/firestore'
import { storage } from '@/firebase'
import { ref, deleteObject } from "firebase/storage"

export default async function useDeleteChat(chatID) {
  const group = await firestoreGetDoc('groups', chatID)
  
  for (const userUID of group.members) {
    const user = await firestoreGetUser(userUID)
    const userGroups = user.groupsID.filter((groupID) => groupID !== chatID)
    await firestoreUpdateDoc('users', userUID, {groupsID: userGroups})
  }

  const groupMsgs = await firestoreGetSubDocs('messages', chatID, 'groupMsgs')
  for (const message of Object.keys(groupMsgs)) {
    await firestoreDeleteSubDoc('messages', chatID, 'groupMsgs', message)
  }

  firestoreDeleteDoc('messages', chatID)
  await firestoreDeleteDoc('groups', chatID)

  const storageRef = ref(storage, `/chat_avatars/${chatID}.jpg`)
  await deleteObject(storageRef)
}