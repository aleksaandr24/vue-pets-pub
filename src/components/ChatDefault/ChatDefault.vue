<template>
  <BaseCard class="chat-default">
    <IconBase
      :icon-props="iconChatStartProps"
    >
      <IconChatStart/>
    </IconBase>
    <p class="chat-default__text">
      Выберите чат <br> или 
      <button
        @click="onCreateChatClick()"
        class="chat-default__button"
      >
      создайте новую беседу
      </button>
    </p>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import IconBase from '@/components/ui/IconBase/IconBase.vue'
import IconChatStart from '@/components/ui/IconChatStart/IconChatStart.vue'

export default {
  name: 'ChatDefault',

  components: {
    BaseCard,
    IconBase,
    IconChatStart
  },

  emits: ['createChat'],

  setup(props, { emit }) {
    const onCreateChatClick = () => emit('createChat')

    return {
      onCreateChatClick,
      iconChatStartProps: {
        width: { 
        'desktop': 56,
        'laptop': 56,
        'tablet': 56,
        'mobile': 56
        },
        height: {
          'desktop': 56,
          'laptop': 56,
          'tablet': 56,
          'mobile': 56
        },
        fill: {
          'light': '#17171B',
          'dark': '#EDF2F7'
        },
        stroke: {
          'light': 'none',
          'dark': 'none'
        }
      }
    }
  }
}
</script>

<style lang="scss" src="./ChatDefault.scss"/>