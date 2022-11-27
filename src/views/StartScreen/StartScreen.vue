<template>
  <main class="main start">
    <BaseLogo
      :size="'xl'"
      class="start__logo"
    />
    <div class="start__caption">
      <h1 class="start__title">Pets</h1>
      <h2 class="start__subtitle">Лапки. Уши. Хвостик и<br>доза любви</h2>
    </div>
    <div class="start__links">
      <BaseButton
        :to="'/login'"
        class="start__button"
      >
        Войти
      </BaseButton>
      <p class="start__text">У вас ещё нет аккаунта?</p>
      <router-link
        to="/registration"
        class="start__link"
      >
        Зарегистрироваться
      </router-link>
    </div>
  </main>
</template>

<script>
import BaseLogo from '@/components/ui/BaseLogo/BaseLogo.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'

export default {
  name: 'StartScreen',

  components: {
    BaseLogo,
    BaseButton
  }
}
</script>

<style lang="scss" src="./StartScreen.scss"/>