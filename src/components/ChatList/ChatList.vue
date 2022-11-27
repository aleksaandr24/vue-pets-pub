<template>
  <div class="chat-list">
    <ChatListSearch
      :disabled="state.userChatsStatus === 'loading'"
    />
    <ChatCreateButton
      :disabled="state.userChatsStatus === 'loading'"
      @click="onCreateChat()"
    />
    <div 
      v-if="state.userChatsStatus === 'empty'"
      class="chat-list__user-chats"
    >
      Нет чатов :(
    </div>
    <SecondLoader
      v-if="state.userChatsStatus === 'loading'"
    />
    <TransitionGroup
      v-if="state.userChatsStatus === 'loaded'"
      name="user-chats"
      tag="div"
      class="chat-list__user-chats"
    >
      <ChatListItem
        v-for="(item, index) in state.userChats"
        :key="index"
        :lastMsgDate="item.lastMsgDate"
        :lastMsgUser="item.lastMsgUser"
        :lastMsgText="item.lastMsgText"
        :users="state.users"
        :chatName="item.name"
        :selected="item.id === activeChatID"
        @click="onSelectChat(item.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import ChatListSearch from '@/components/ChatListSearch/ChatListSearch.vue'
import ChatListItem from '@/components/ChatListItem/ChatListItem.vue'
import ChatCreateButton from '@/components/ChatCreateButton/ChatCreateButton.vue'
import SecondLoader from '@/components/ui/SecondLoader/SecondLoader.vue'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { firebaseStore } from '@/firebase'
import { firestoreGetDocs } from '@/firebase/firestore'
import { onSnapshot, doc } from '@firebase/firestore'

export default {
  name: 'ChatList',

  components: {
    ChatListSearch,
    ChatCreateButton,
    ChatListItem,
    SecondLoader
  },

  props: {
    activeChatID: {
      type: String,
      default: ''
    }
  },

  emits: [
    'selectChat',
    'createChat'
  ],

  setup(props, { emit }) {
    const store = useStore()
    const state = reactive({
      userUID: computed(() => store.getters.getUserUID),
      users: {},
      currUserGroups: [],
      userChatsStatus: 'loading',
      userChatsItems: {},
      userChats: computed(() => Object.keys(state.userChatsItems)
      .map(key => {const item = state.userChatsItems[key]; item.id = key; return item})
      .sort((a, b) => a.lastMsgDate.toDate() > b.lastMsgDate.toDate() ? -1 : 1))
    })
    
    firestoreGetDocs('users').then(users => {
      state.users = users
      onSnapshot(doc(firebaseStore, 'users', state.userUID), snapshot => {
        state.currUserGroups = snapshot.data().groupsID
        state.userChatsItems = {}
        if (state.currUserGroups.length > 0) {
          for (const group of state.currUserGroups) {
            onSnapshot(doc(firebaseStore, 'groups', group), snapshot => {
              state.userChatsItems[snapshot.id] = snapshot.data()
            })
          }
          state.userChatsStatus = 'loaded'
        } else state.userChatsStatus = 'empty'
      })
    })
    
    return {
      state,
      onCreateChat: () => emit('createChat'),
      onSelectChat: (id) => emit('selectChat', id)
    }
  }
}
</script>

<style lang="scss" src="./ChatList.scss"/>