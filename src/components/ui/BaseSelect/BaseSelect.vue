<template>
  <div
    :class="['base-select', {'base-select_danger': danger}]"
    @click="selectOpen = !selectOpen"
    @blur="selectOpen = false"
    tabindex="0"
    >
    <div class="base-select__selected-label">
      <slot/>
    </div>
    <div
      :class="['base-select__selected-option',
      {'base-select__selected-option_open': selectOpen}]"
    >
      {{ selectedOption }}
    </div>
    <ul
      :class="['base-select__options', {'base-select__options_open': selectOpen}]"
    >
      <li
        v-for="(option, index) in elemData"
        :key="index"
        :class="['base-select__option', {'base-select__option_disabled': option.disabled}]"
        @click="makeSelected(option.name)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',

  props: {
    modelValue: {
      type: String
    },

    elemData: {
      type: Array,
      default: []
    },

    danger: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'update:modelValue'
  ],

  data() {
    return {
      selectOpen: false,
      selectedValue: null
    }
  },

  computed: {
    selectedOption() {
      if (this.elemData.length === 0) {
        return 'Нет элементов'
      }
      if (this.selectedValue === null) {
        return 'Выбрать'
      }
      return this.selectedValue
    }
  },

  methods: {
    makeSelected(optionValue) {
      this.selectOpen = false
      this.selectedValue = optionValue
      this.$emit('update:modelValue', optionValue)
    }
  }
}
</script>

<style lang="scss" src="./BaseSelect.scss"/>