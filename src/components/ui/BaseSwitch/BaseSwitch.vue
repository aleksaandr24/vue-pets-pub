<template>
  <div class="base-switch">
    <input
      :id="elemID"
      :checked="elemChecked"
      :disabled="elemDisabled"
      @change="$emit('update:modelValue', { id: $event.target.id, checked: $event.target.checked })"
      type="checkbox"
      class="base-switch__input"
    />
    <label
      :for="elemID"
      class="base-switch__label"
    >
    </label>
    <label
      :for="elemID"
      class="base-switch__caption"
    >
      <slot/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseSwitch',

  props: {
    modelValue: {
      type: [String, Object]
    },
    
    elemID: {
      type: String,
      required: true
    },

    elemDisabled: {
      type: Boolean,
      default: false
    },

    elemChecked: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'update:modelValue'
  ]
}
</script>

<style lang="scss" src="./BaseSwitch.scss"/>