<template>
  <input
    :class="['base-input', elemClass]"
    :value="modelValue"
    :placeholder="placeholder"
    :type="elemInputType"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <br>
  <span class="base-input__message">
    {{ errorMessage }}
  </span>
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    modelValue: {
      type: String
    },

    elemClass: {
      type: String,
      default: ''
    },

    elemInputType: {
      type: String,
      default: 'text'
    },

    placeholder: {
      type: String,
      default: ''
    },
    
    errorMessage: {
      type: String,
      default: ''
    }
  },

  emits: [
    'update:modelValue'
  ]
}
</script>

<style lang="scss" src="./BaseInput.scss"/>