<template>
  <div
    :class="['base-logo',
            {'base-logo_md': size === 'md'},
            {'base-logo_lg': size === 'lg'},
            {'base-logo_xl': size === 'xl'}]"
  >
  </div>
</template>

<script>
export default {
  name: 'BaseLogo',

  props: {
    size: {
      type: String,
      default: 'sm'
    }
  }
}
</script>

<style lang="scss" src="./BaseLogo.scss"/>