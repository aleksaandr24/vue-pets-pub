import { serverTimestamp  } from 'firebase/firestore'
import { firestoreAddDoc,
        firestoreAddSubDoc,
        firestoreGetUser,
        firestoreUpdateDoc } from '@/firebase/firestore'

export default async function useCreateChat(groupName, members, creator) {
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
  
  return createdGroup.id
}