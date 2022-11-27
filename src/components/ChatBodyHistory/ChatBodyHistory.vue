<template>
  <div
    v-if="chatHistory !== 'initial'"
    class="chat-history"
  >
    <ChatBodyHistoryItem
      v-for="(item, key) in chatHistory"
      :key="key"
      :chatHistoryItem="item"
    />
  </div>
  <div
    v-else
    class="chat-history"
  >
    <p class="chat-initial-text">Создан чат. Начните беседу...</p>
  </div>
</template>

<script>
import ChatBodyHistoryItem from '@/components/ChatBodyHistoryItem/ChatBodyHistoryItem.vue'
import { ref, toRef } from 'vue'
import { firebaseStore } from '@/firebase'
import { firestoreGetUser } from '@/firebase/firestore'
import { onSnapshot, collection } from '@firebase/firestore'

export default {
  name: 'ChatBodyHistory',

  components: {
    ChatBodyHistoryItem
  },

  props: {
    chatID: {
      type: String,
      required: true
    }
  },

  emits: ['historyLoaded'],

  setup(props, { emit }) {
    const chatID = toRef(props, 'chatID')
    
    const chatHistory = ref([])
    onSnapshot(collection(firebaseStore, 'messages', chatID.value, 'groupMsgs'), async snapshot => {
      const chatMsgs = {}
      const chatByDates = {}
      snapshot.forEach(doc => chatMsgs[doc.id] = doc.data())
      
      for (const key of Object.keys(chatMsgs)) {
        const item = chatMsgs[key]
        const msgDateISO = item.msgDate.toDate().toISOString().slice(0, 10)
        item.id = key
        const user = await firestoreGetUser(item.msgUser)
        item.userName = user.name
        item.msgDate = item.msgDate.toDate()
        
        if (item.msgType !== 'initial') {
          if (chatByDates.hasOwnProperty(msgDateISO)) {
            chatByDates[msgDateISO].push(item)
          } else {
            chatByDates[msgDateISO] = [item]
          }
        }
      }

      if (Object.keys(chatMsgs).length === 1) chatHistory.value = 'initial'
      else {
        const orderedMsgs = Object
          .entries(chatByDates)
          .sort((a, b) => Date.parse(a[0]) > Date.parse(b[0]) ? 1 : -1)
        chatHistory.value =  orderedMsgs
        emit('historyLoaded')
      }
    })
    
    return {
      chatHistory
    }
  }
}
</script>

<style lang="scss" src="./ChatBodyHistory.scss"/>