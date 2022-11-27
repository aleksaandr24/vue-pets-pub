<template>
  <BaseCard class="conversation">
    <div class="conversation__header">
      <div class="conversation__back-btn">
        <button
          :disabled="chatDeleteInProgress"
          @click="onBackBtnClick()"
          class="conversation-back-button"
        />
      </div>
      <div class="conversation__title">
        {{ chatTitle }}
      </div>
      <div class="conversation__delete-btn">
        <button
          :disabled="chatDeleteInProgress"
          @click="onDeleteBtnClick()"
          class="conversation-delete-button"
        />
      </div>
    </div>
    <div
      ref="dialog"
      class="conversation__dialog"
    >
      <ChatBodyHistory
        v-if="!chatDeleteInProgress"
        :chatID="chatID"
        @history-loaded="scrollDownDialog()"
      />
      <SecondLoader
        v-else
      />
    </div>
    <ChatBodyForm
      :chatID="chatID"
      :disabled="chatDeleteInProgress"
    />
  </BaseCard>
</template>

<script>
import ChatBodyHistory from '@/components/ChatBodyHistory/ChatBodyHistory.vue'
import ChatBodyForm from '@/components/ChatBodyForm/ChatBodyForm.vue'
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import SecondLoader from '@/components/ui/SecondLoader/SecondLoader.vue'
import { ref } from 'vue'
import { firestoreGetDoc } from '@/firebase/firestore'
import useDeleteChat from '@/composables/useDeleteChat'

export default {
  name: 'ChatBody',

  components: {
    ChatBodyHistory,
    ChatBodyForm,
    BaseCard,
    SecondLoader
  },

  props: {
    chatID: {
      type: String,
      required: true
    }
  },

  emits: ['defaultChat'],

  setup(props, { emit }) {
    const chatTitle = ref('')
    const setChatTitle = async () => {
      const group = await firestoreGetDoc('groups', props.chatID)
      chatTitle.value = group.name
    }
    setChatTitle()

    const chatDeleteInProgress = ref(false)
    const onDeleteBtnClick = () => {
      if (confirm('Удалить чат и все сообщения?')) {
        chatDeleteInProgress.value = true
        useDeleteChat(props.chatID).then(emit('defaultChat'))
      }
    }

    const dialog = ref()
    const scrollDownDialog = () => setTimeout(() => {
        dialog.value.scrollTop = dialog.value.scrollHeight
      }, 1000)
    
    return {
      chatTitle,
      onBackBtnClick: () => emit('defaultChat'),
      onDeleteBtnClick,
      chatDeleteInProgress,
      dialog,
      scrollDownDialog
    }
  }
}
</script>

<style lang="scss" src="./ChatBody.scss"/>