<template>
  <section
    :class="['chat__side-panel',
            {'chat__side-panel_down': (currentChatID !== 'default') && isMobileOrTablet},
            {'chat__side-panel_up': (currentChatID === 'default') && isMobileOrTablet}]"
  >
    <Transition name="side-panel">
      <ChatCreate
        v-if="showChatCreate"
        @closeCreateChat="onCreateChatBtn()"
        @chatCreated="(id) => onChatCreated(id)"
      />
      <ChatList
        v-else
        :key="chatListkey"
        :activeChatID="currentChatID"
        @selectChat="(id) => showSelectedChat(id)"
        @createChat="onCreateChatBtn()"
      />
    </Transition>
  </section>
  <section
    :class="['chat__conversation-panel',
            {'chat__conversation-panel_down': (currentChatID === 'default') && isMobileOrTablet},
            {'chat__conversation-panel_up': (currentChatID !== 'default') && isMobileOrTablet}]"
  >
    <ChatDefault
      v-if="(currentChatID === 'default') && (!isMobileOrTablet)"
      @createChat="onCreateChatBtn()"
    />
    <ChatBodyLoader
      v-if="currentChatID !== 'default'"
      :key="currentChatID"
    >
      <ChatBody
        :chatID="currentChatID"
        @defaultChat="onChatDefault()"
      />
    </ChatBodyLoader>
  </section>
</template>

<script>
import ChatList from '@/components/ChatList/ChatList.vue'
import ChatCreate from '@/components/ChatCreate/ChatCreate.vue'
import ChatDefault from '@/components/ChatDefault/ChatDefault.vue'
import ChatBodyLoader from '@/components/ChatBodyLoader/ChatBodyLoader.vue'
import ChatBody from '@/components/ChatBody/ChatBody.vue'
import pageLoading from '@/mixins/pageLoading'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ChatScreen',

  components: {
    ChatList,
    ChatCreate,
    ChatDefault,
    ChatBodyLoader,
    ChatBody
  },

  mixins: [
    pageLoading
  ],

  setup() {
    const store = useStore()

    const showChatCreate = ref(false)
    const onCreateChatBtn = () => showChatCreate.value = !showChatCreate.value
    
    const currentChatID = ref('default')
    const showSelectedChat = (id) => currentChatID.value = id

    const onChatCreated = (id) => {
      onCreateChatBtn()
      showSelectedChat(id)
    }

    const chatListkey = ref(0)

    return {
      isMobileOrTablet: computed(() => ['tablet', 'mobile'].includes(store.getters.getScreenType)),
      showChatCreate,
      currentChatID,
      chatListkey,
      showSelectedChat,
      onCreateChatBtn,
      onChatCreated,
      onChatDefault: () => {
        currentChatID.value = 'default'
        chatListkey.value++
      }
    }
  }
}
</script>

<style lang="scss" src="./ChatScreen.scss"/>