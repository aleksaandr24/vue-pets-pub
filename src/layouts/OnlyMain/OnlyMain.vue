<template>
  <slot/>
</template>

<script>
export default {
  name: 'OnlyMain',

  props: {
    loader: {
      type: Boolean,
      default: false
    }
  }
}
</script>