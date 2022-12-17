import { serverTimestamp  } from 'firebase/firestore'
import { firestoreAddDoc,
        firestoreAddSubDoc,
        firestoreGetUser,
        firestoreUpdateDoc } from '@/firebase/firestore'
import { storage } from '@/firebase'
import { ref, uploadString } from "firebase/storage"

export default async function useCreateChat(groupName, members, creator, avatar) {
  members.push(creator)
  
  const groupsItem = {
    createdUser: creator,
    creationDate: serverTimestamp(),
    members: members,
    name: groupName,
    lastMsgDate: serverTimestamp(),
    lastMsgText: 'Создан чат',
    lastMsgUser: creator
  }
  const createdGroup = await firestoreAddDoc('groups', groupsItem)
  const msgItem = {
    msgDate: serverTimestamp(),
    msgType: 'initial',
    msgUser: creator
  }
  await firestoreAddSubDoc('messages', createdGroup.id, 'groupMsgs', msgItem)

  for (const uid of members) {
    const user = await firestoreGetUser(uid)
    const userGroups = user.groupsID
    userGroups.push(createdGroup.id)
    await firestoreUpdateDoc('users', uid, {groupsID: userGroups})
  }
  
  const storageRef = ref(storage, `/chat_avatars/${createdGroup.id}.jpg`)
  await uploadString(storageRef, avatar.split(',')[1], 'base64', {contentType: 'image/jpeg'})
  return createdGroup.id
}