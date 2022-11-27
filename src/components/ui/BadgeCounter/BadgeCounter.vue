<template>
  <div class="badge-counter">
    {{ likesValue }}
  </div>
</template>

<script>
import declOfNum from '@/helpers/declOfnUm.js'

export default {
  name: 'BadgeCounter',

  props: {
    likes: {
      type: Number,
      default: 0
    }
  },

  computed: {
    likesValue() {
      return `${this.likes} ${declOfNum(this.likes, ['лайк', 'лайка', 'лайков'])}`
    }
  }
}
</script>

<style lang="scss" src="./BadgeCounter.scss"/>