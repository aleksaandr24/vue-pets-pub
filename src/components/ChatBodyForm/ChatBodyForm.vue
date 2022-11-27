<template>
  <form
    @submit.prevent
    class="conversation__message"
  >
    <div class="conversation__stickers-btn">
      <button
        :disabled="disabled"
        class="conversation-stickers-button"
        type="button"
      />
    </div>
    <div class="conversation__input-text">
      <textarea
        v-model.trim="formText"
        :disabled="disabled"
        @input="sendBtnDisabled = false"
        @keypress.enter.prevent="sendMessage()"
        class="conversation-input-text"
        placeholder="Написать сообщение..."
      />
    </div>
    <div class="conversation__smiles-btn">
      <button
        :disabled="disabled"
        class="conversation-smiles-button"
        type="button"
      />
    </div>
    <div class="conversation__send-btn">
      <button
        :disabled="sendBtnDisabled || disabled"
        @click="sendMessage()"
        class="conversation-send-button"
        type="submit"
      />
    </div>
  </form>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { serverTimestamp  } from 'firebase/firestore'
import { firestoreAddSubDoc, firestoreUpdateDoc } from '@/firebase/firestore'

export default {
  name: 'ChatBodyForm',

  props: {
    chatID: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const store = useStore()
    const userUID = computed(() => store.getters.getUserUID)
    
    const sendBtnDisabled = ref(false)
    const formText = ref('')
    const rules = computed(() => ({
      formText: { required }
    }))
    const v$ = useVuelidate(rules, { formText })

    const sendMessage = async () => {
      sendBtnDisabled.value = true
      const validateResult = await v$.value.$validate()
      if (!validateResult) return
      const firestoreMsgItem = {
        msgDate: serverTimestamp(),
        msgType: 'text',
        msgText: formText.value,
        msgUser: userUID.value
      }
      const firestoreLastMsgItem = {
        lastMsgDate: serverTimestamp(),
        lastMsgText: formText.value,
        lastMsgUser: userUID.value
      }
      await Promise.all([
        firestoreAddSubDoc('messages', props.chatID, 'groupMsgs', firestoreMsgItem),
        firestoreUpdateDoc('groups', props.chatID, firestoreLastMsgItem)])
      formText.value = ''
      sendBtnDisabled.value = false
    }

    return {
      v$,
      formText,
      sendBtnDisabled,
      sendMessage
    }
  }
}
</script>

<style lang="scss" src="./ChatBodyForm.scss"/>