<template>
  <div class="chat-creation">
    <div :disabled="createChatInProgress" class="chat-creation__picture"></div>
    <BaseCard class="chat-creation__name">
      <input
        v-model="chatName"
        :disabled="createChatInProgress"
        class="chat-creation__input"
        placeholder="Введите название чата"
      >
    </BaseCard>
    <ChatCreateButton
      @click="onCloseCreateChatClick()"
      :disabled="createChatInProgress"
      active
      class="chat-creation__button"
    />
    <TransitionGroup 
      v-if="usersList.length > 0"
      name="users-list"
      tag="div"
      class="chat-creation__items"
    >
      <ChatCreateItem
        v-for="item in usersList"
        :key="item.id"
        :userItem="item"
        :disabled="createChatInProgress"
        @update:modelValue="(value) => onUserItemSwitch(value)"
      />
    </TransitionGroup>
    <div
      v-else
      class="chat-creation__items"
    >
      Нет пользователей :(
    </div>
    <div class="chat-creation__bottom-buttons">
      <BaseButton
        :disabled="createBtnDisabled"
        :loading="createChatInProgress"
        @click="onCreateChat()"
        class="chat-creation__create-btn"
      >
        Создать чат
      </BaseButton>
      <BaseButton
        :disabled="createChatInProgress"
        @click="onCloseCreateChatClick()"
        class="chat-creation__cancel-btn"
      >
        Отмена
      </BaseButton>
    </div>
  </div>
</template>

<script>
import ChatCreateButton from '@/components/ChatCreateButton/ChatCreateButton.vue'
import ChatCreateItem from '@/components/ChatCreateItem/ChatCreateItem.vue'
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { firestoreGetDocs } from '@/firebase/firestore'
import useCreateChat from '@/composables/useCreateChat'

export default {
  name: 'ChatCreate',

  components: {
    ChatCreateButton,
    ChatCreateItem,
    BaseCard,
    BaseButton
  },

  emits: [
    'closeCreateChat',
    'chatCreated'
  ],

  setup(props, { emit }) {
    const store = useStore()
    const userUID = computed(() => store.getters.getUserUID)
    
    const usersList = ref([])
    const setUsersList = async () => {
      const result = await firestoreGetDocs('users')
      usersList.value = Object.keys(result)
      .filter((key) => key !== userUID.value)
      .map((key) => {
        const item = result[key]
        item.id = key
        return item
      })
    }
    setUsersList()
    
    const usersChecked = ref({})
    const minUsersChecked = (users) => {
      if (Object.keys(users).length === 0) return false
      if (!Object.values(users).includes(true)) return false
      return true
    }
    const onUserItemSwitch = (value) => usersChecked.value[value.id] = value.checked

    const createChatInProgress = ref(false)
    const chatName = ref('')
    const chatMembers = computed(() => {
      return Object.keys(usersChecked.value).filter((item) => usersChecked.value[item])
      })
    const createBtnDisabled = computed(() => {
      if ((chatName.value.length > 0) && (minUsersChecked(usersChecked.value))) return false
      return true
    })
    const onCreateChat = async () => {
      createChatInProgress.value = true
      const createdChatID = await useCreateChat(chatName.value, chatMembers.value, userUID.value)
      emit('chatCreated', createdChatID)
    }

    const onCloseCreateChatClick = () => emit('closeCreateChat')
    
    return {
      usersList,
      chatName,
      createBtnDisabled,
      createChatInProgress,
      onUserItemSwitch,
      onCreateChat,
      onCloseCreateChatClick
    }
  }
}
</script>

<style lang="scss" src="./ChatCreate.scss"/>