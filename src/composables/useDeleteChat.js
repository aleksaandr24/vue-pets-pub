import { firestoreDeleteDoc,
        firestoreDeleteSubDoc,
        firestoreGetDoc, 
        firestoreGetSubDocs, 
        firestoreGetUser,
        firestoreUpdateDoc} from '@/firebase/firestore'

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
}