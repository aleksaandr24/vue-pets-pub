<template>
  <BaseCard class="chat-search-panel">
    <IconBase
      :icon-props="iconChatSearchProps"
    >
      <IconChatSearch/>
    </IconBase>
    <input
      :disabled="disabled"
      class="chat-search-panel__input"
      type="text"
      placeholder="Поиск..."
    />
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import IconBase from '@/components/ui/IconBase/IconBase.vue'
import IconChatSearch from '@/components/ui/IconChatSearch/IconChatSearch.vue'

export default {
  name: 'ChatListSearch',

  components: {
    BaseCard,
    IconBase,
    IconChatSearch
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    
    return {
      iconChatSearchProps: {
        width: {
          'desktop': 16,
          'laptop': 16,
          'tablet': 16,
          'mobile': 16
        },
        height: {
          'desktop': 16,
          'laptop': 16,
          'tablet': 16,
          'mobile': 16
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

<style lang="scss" src="./ChatListSearch.scss"/>