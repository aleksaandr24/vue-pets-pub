<template>
  <BaseCard
    :class="['user-chat-item',
    {'user-chat-item_selected': selected}]"
  >
    <div
      class="user-chat-item__avatar"
    >
      <img
        :src="chatAvatarLink"
        class="user-chat-item__img"
      />
    </div>
    <div class="user-chat-item__name">{{ chatName }}</div>
    <div class="user-chat-item__date">{{ lastMsgDateField }}</div>
    <div class="user-chat-item__message">{{ lastMsgTextField }}</div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import { computed, toRef, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { storage } from '@/firebase'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'

export default {
  name: 'ChatListItem',

  components: {
    BaseCard
  },

  props: {
    lastMsgDate: Object,
    lastMsgUser: String,
    lastMsgText: String,
    chatName: String,
    chatID: String,
    users: Object,
    selected: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const store = useStore()
    const lastMsgDate = toRef(props, 'lastMsgDate')
    const lastMsgUser = toRef(props, 'lastMsgUser')
    const lastMsgText = toRef(props, 'lastMsgText')
    const chatID = toRef(props, 'chatID')
    const users = toRef(props, 'users')
    const userUID = computed(() => store.getters.getUserUID)
    const today = new Date()
    
    const lastMsgDateField = computed(() => {
      const lastMsgDateNum = lastMsgDate.value.toDate().getDate()
      const lastMsgMonth = lastMsgDate.value.toDate().toLocaleDateString('ru-RU', {month: 'short'}).slice(0, 3)
      const lastMsgYear = lastMsgDate.value.toDate().getFullYear()
      if (today.getDate() === lastMsgDateNum) {
        return lastMsgDate.value.toDate().toLocaleTimeString('ru-RU', {hour: 'numeric', minute:'2-digit'})
      }
      if (today.getDate() - lastMsgDateNum === 1) {
        return 'Вчера'
      }
      if (today.getFullYear() === lastMsgYear) {
        return `${lastMsgDateNum} ${lastMsgMonth}`
      }
      if (today.getFullYear() > lastMsgYear) {
        return `${lastMsgDateNum} ${lastMsgMonth} ${lastMsgYear}`
      }
    })

    const lastMsgUserName = computed(() => {
      return lastMsgUser.value === userUID.value ? 'Вы' : users.value[lastMsgUser.value].name
    })
    
    const lastMsgTextField = computed(() => `${lastMsgUserName.value}: ${lastMsgText.value}`)

    const chatAvatarLink = ref()
    onMounted(async () => {
      const childRef = `/chat_avatars/${chatID.value}.jpg`
      const url = await getDownloadURL(storageRef(storage, childRef))
      chatAvatarLink.value = url
    })
    
    return {
      lastMsgDateField,
      lastMsgTextField,
      chatAvatarLink
    }
  }
}
</script>

<style lang="scss" src="./ChatListItem.scss"/>