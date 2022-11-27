<template>
  <div
    :class="['badge-like', {'badge-like_liked': isLiked}]"
    @click="handleLike"
  >
  </div>
</template>

<script>
export default {
  name: 'BadgeLike',

  props: {
    liked: {
      type: Boolean,
      default: false
    }
  },
  
  emits: [
    'eventLike'
  ],

  data() {
    return {
      isLiked: this.liked
    }
  },

  methods: {
    handleLike() {
      this.isLiked = !this.isLiked
      this.$emit('eventLike', this.isLiked)
    }
  }
}
</script>

<style lang="scss" src="./BadgeLike.scss"/>