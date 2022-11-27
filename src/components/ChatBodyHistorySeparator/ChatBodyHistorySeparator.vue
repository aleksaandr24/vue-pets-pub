<template>
  <div class="chat-history__date-separator">
    <hr class="chat-history__date-separator-line">
    <div class="chat-history__date-separator-title">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBodyHistorySeparator'
}
</script>

<style lang="scss" src="./ChatBodyHistorySeparator.scss"/>