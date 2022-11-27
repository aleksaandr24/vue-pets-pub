<template>
  <div class="theme-switch">
    <input
      :id="elemID"
      :checked="elemChecked"
      :disabled="elemDisabled"
      @change="$emit('update:modelValue', { id: $event.target.id, checked: $event.target.checked })"
      type="checkbox"
      class="theme-switch__input"
    />
    <label
      :for="elemID"
      class="theme-switch__label"
    >
    </label>
  </div>
</template>

<script>
import BaseSwitch from '@/components/ui/BaseSwitch/BaseSwitch.vue'

export default {
  name: 'TheHeaderThemeSwitch',

  extends: BaseSwitch
}
</script>

<style lang="scss" src="./TheHeaderThemeSwitch.scss"/>