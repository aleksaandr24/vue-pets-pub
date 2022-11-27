<template>
  <SecondLoader
    v-if="showLoader"
  />
  <div
    v-else
    class="chat-body"
  >
    <slot/>
  </div>
</template>

<script>
import SecondLoader from '@/components/ui/SecondLoader/SecondLoader.vue'
import { ref } from 'vue'

export default {
  name: 'ChatBodyLoader',

  components: {
    SecondLoader
  },

  setup() {
    const showLoader = ref(true)
    setTimeout(() => showLoader.value = false, 2000)

    return {
      showLoader
    }
  }
}
</script>

<style lang="scss" src="./ChatBodyLoader.scss"/>