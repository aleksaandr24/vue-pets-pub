<template>
  <div class="vfl-has-label">
    <label
      class="vfl-label"
      :class="[{'vfl-label-on-input': on && (isActive || fixed)},
              {'vfl-label-on-focus': isFocused}]"
      :for="inputId">
      {{ floatLabel }}
    </label>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'FloatLabel',

  props: {
    on: {
      type: Boolean,
      default: true
    },

    fixed: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: ''
    },

    dispatch: {
      type: Boolean,
      default: true
    },

    for: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      formEl: undefined,
      labelEl: undefined,
      isActive: false,
      isFocused: false
    }
  },

  computed: {
    inputId() {
      return this.for
    },

    formElType() {
      return this.formEl ? this.formEl.tagName.toLowerCase() : ''
    },

    floatLabel() {
      if (this.label !== '') return this.label

      switch (this.formElType) {
        case 'input':
        case 'textarea':
          return this.formEl.placeholder
        case 'select':
          return this.formEl.querySelector('option[disabled]').innerHTML
        default:
          return ''
      }
    }
  },

  mounted() {
    this.formEl = this.$el.querySelector('input, textarea, select')
    this.formEl.addEventListener('input', this.updateIsActive)
    this.formEl.addEventListener('input', this.updateIsFocused)
    this.formEl.addEventListener('blur', this.updateIsFocused)
    this.formEl.addEventListener('focus', this.updateIsFocused)

    if (!this.for) {
      this.labelEl = this.$el.querySelector('label')
      this.labelEl.addEventListener('click', this.focusFormEl)
    }

    this.dispatchInput()
  },

  beforeDestroy() {
    this.formEl.removeEventListener('input', this.updateIsActive)
    this.formEl.removeEventListener('input', this.updateIsFocused)
    this.formEl.removeEventListener('blur', this.updateIsFocused)
    this.formEl.removeEventListener('focus', this.updateIsFocused)
  },

  methods: {
    dispatchInput() {
      if (this.dispatch) {
        const event = new Event('HTMLEvents')
        this.formEl.dispatchEvent(event)
      }
    },

    focusFormEl() {
      this.formEl.focus()
    },

    updateIsActive(e) {
      this.isActive = e.target.value.length > 0
    },

    updateIsFocused(e) {
      this.isFocused = e.target === document.activeElement && this.isActive
    }
  }
}
</script>

<style lang="scss" src="./FloatLabel.scss"/>