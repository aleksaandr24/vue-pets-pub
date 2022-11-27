<template>
  <div class="greeting">
    <h2 class="greeting__title">С возвращением, {{ userName }}</h2>
    <p class="greeting__text">Не забудь покормить своего питомца</p>
    <p class="greeting__text">Хорошего дня!</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeGreeting',

  computed: {
    ...mapGetters({
      userName: 'getUserName'
    })
  }
}
</script>

<style lang="scss" src="./HomeGreeting.scss"/>