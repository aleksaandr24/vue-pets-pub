<template>
  <button
    :class="['carousel-control',
    {'carousel-control_prev': prev}]"
  >
  </button>
</template>

<script>
export default {
  name: 'CarouselControl',
  
  props: {
    prev: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" src="./CarouselControl.scss"/>