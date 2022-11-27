<template>
  <button
    :class="['chat-new-button',
            {'chat-new-button_active': active}]"
  >
  </button>
</template>

<script>
export default {
  name: 'ChatCreateButton',

  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" src="./ChatCreateButton.scss"/>