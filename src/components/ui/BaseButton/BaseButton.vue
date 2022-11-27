<template>
  <router-link
    v-if="to !== ''"
    :to="this.to"
    class="base-button"
  >
    <div
      v-if="loading"
      class="lds-dots"
    >
      <div class="lds-dots__dot"></div>
      <div class="lds-dots__dot"></div>
      <div class="lds-dots__dot"></div>
      <div class="lds-dots__dot"></div>
    </div>
    <slot
      v-else
    />
  </router-link>
  <button
    v-else
    :disabled="disabled || loading"
    type="button"
    class="base-button"
  >
    <div
      v-if="loading"
      class="lds-dots"
    >
      <div class="lds-dots__dot"></div>
      <div class="lds-dots__dot"></div>
      <div class="lds-dots__dot"></div>
      <div class="lds-dots__dot"></div>
    </div>
    <slot
      v-else
    />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" src="./BaseButton.scss"/>