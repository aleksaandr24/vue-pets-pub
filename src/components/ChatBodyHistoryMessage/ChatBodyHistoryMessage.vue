<template>
  <div class="chat-history-message-container">
    <BaseAvatar
        v-if="!messageFromCurrUser"
        :size="'sm'"
        :name="chatMessage.userName"
      />
    <div
      :class="['chat-history__message',
              {'chat-history__message_incoming': !messageFromCurrUser},
              {'chat-history__message_outgoing': messageFromCurrUser}]"
    >
      <div class="chat-history__message-text">{{ messageContent }}</div>
      <div class="chat-history__message-time">{{ messageTime }}</div>
    </div>
  </div>
</template>

<script>
import BaseAvatar from '@/components/ui/BaseAvatar/BaseAvatar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ChatBodyHistoryMessage',

  components: {
    BaseAvatar
  },

  props: {
    chatMessage: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const store = useStore()
    const userUID = computed(() => store.getters.getUserUID)

    const {msgDate, msgUser, msgText} = props.chatMessage
    const messageFromCurrUser = computed(() => msgUser === userUID.value)
    const messageContent = msgText
    const messageTime = computed(() => msgDate.toLocaleTimeString('ru-RU', {hour: 'numeric', minute:'2-digit'}))

    return {
      messageFromCurrUser,
      messageContent,
      messageTime
    }
  }
}
</script>

<style lang="scss" src="./ChatBodyHistoryMessage.scss"/>