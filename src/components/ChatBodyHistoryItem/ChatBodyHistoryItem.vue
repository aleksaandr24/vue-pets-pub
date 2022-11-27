<template>
  <ChatBodyHistorySeparator>
    {{ separatorDate }}
  </ChatBodyHistorySeparator>
  <ChatBodyHistoryMessage
    v-for="(msgsItem, index) in chatMessages"
    :chatMessage="msgsItem"
    :key="index"
  />
</template>

<script>
import ChatBodyHistorySeparator from '@/components/ChatBodyHistorySeparator/ChatBodyHistorySeparator.vue'
import ChatBodyHistoryMessage from '@/components/ChatBodyHistoryMessage/ChatBodyHistoryMessage.vue'
import { computed } from 'vue'

export default {
  name: 'ChatBodyHistoryItem',

  components: {
    ChatBodyHistorySeparator,
    ChatBodyHistoryMessage
  },

  props: {
    chatHistoryItem: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const separatorDate = computed(() => {
      const today = new Date()
      const msgDateConvert = new Date(Date.parse(props.chatHistoryItem[0]))
      const msgDateNum = msgDateConvert.getDate()
      const msgMonth = msgDateConvert.toLocaleDateString('ru-RU', {month: 'short'}).slice(0, 3)
      const msgYear = msgDateConvert.getFullYear()
      
      if (today.getDate() === msgDateConvert.getDate()) {
        return 'Сегодня'
      }

      if (today.getDate() - msgDateConvert.getDate() === 1) {
        return 'Вчера'
      }

      if (today.getFullYear() === msgYear) {
        return `${msgDateNum} ${msgMonth}`
      }

      if (today.getFullYear() > msgYear) {
        return `${msgDateNum} ${msgMonth} ${msgYear}`
      }
    })

    const chatMessages = computed(() => {
      return props.chatHistoryItem[1].sort((a, b) => a.msgDate > b.msgDate ? 1 : -1)
    })

    return {
      separatorDate,
      chatMessages
    }
  }
}
</script>

<style lang="scss" src="./ChatBodyHistoryItem.scss"/>