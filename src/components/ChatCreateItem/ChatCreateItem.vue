<template>
  <BaseCard
    class="chat-creation-item"
  >
    <BaseAvatar
      :name="userItem.name"
      size="sm"
    />
    <div class="chat-creation-item__name">
      {{ userItem.name }}
    </div>
    <BaseSwitch
      :elemID="userItem.id"
      :elemDisabled="disabled"
      @update:modelValue="(value) => onSwitch(value)"
    >
    </BaseSwitch>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import BaseAvatar from '@/components/ui/BaseAvatar/BaseAvatar.vue'
import BaseSwitch from '@/components/ui/BaseSwitch/BaseSwitch.vue'

export default {
  name: 'ChatCreateItem',

  components: {
    BaseCard,
    BaseAvatar,
    BaseSwitch
  },

  props: {
    userItem: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const onSwitch = (value) => emit('update:modelValue', value)

    return {
      onSwitch
    }
  }
}
</script>

<style lang="scss" src="./ChatCreateItem.scss"/>