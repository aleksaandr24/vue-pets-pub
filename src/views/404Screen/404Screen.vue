<template>
  <section class="error-404__picture">
    <img
      v-if="randomError.img === 1"
      src="@/assets/images/404Screen/404-1-dragon.svg"
      alt="404 Picture"
      class="error-404__img"
    />
    <img
      v-if="randomError.img === 2"
      src="@/assets/images/404Screen/404-2-cat.svg"
      alt="404 Picture"
      class="error-404__img"
    />
    <img
      v-if="randomError.img === 3"
      src="@/assets/images/404Screen/404-3-naughty-cat.svg"
      alt="404 Picture"
      class="error-404__img"
    />
    <img
      v-if="randomError.img === 4"
      src="@/assets/images/404Screen/404-4-dog.svg"
      alt="404 Picture"
      class="error-404__img"
    />
  </section>
  <section class="error-404__caption">
    <h2 class="error-404__title">{{ randomError.title }}</h2>
  </section>
  <section class="error-404__message">
    <div class="error-404__text">{{ randomError.text }}</div>
  </section>
</template>

<script>
export default {
  name: '404Screen',

  computed: {
    randomError() {
      const errors404 = [
        {img: 1, title: 'Is That A Dragon ?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra integer vel quam amet eget. Massa nec nam molestie urna, iaculis sed. Dui tincidunt pharetra sagittis, massa lectus nullam viverra. Commodo sapien ornare cursus vitae aliquam ut diam, facilisis.'},
        {img: 2, title: 'Ugh I Just Break It !', text: 'Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow'},
        {img: 3, title: 'This Thing Is Broken', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra integer vel quam amet eget. Massa nec nam molestie urna, iaculis sed. Dui tincidunt pharetra sagittis, massa lectus nullam viverra. Commodo sapien ornare cursus vitae aliquam ut diam, facilisis.'},
        {img: 4, title: 'Looking Sad Bae ?', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra integer vel quam amet eget. Massa nec nam molestie urna, iaculis sed. Dui tincidunt pharetra sagittis, massa lectus nullam viverra. Commodo sapien ornare cursus vitae aliquam ut diam, facilisis.'}
      ]
      const randomCode = Math.floor(Math.random() * (4))
      return errors404[randomCode]
    }
  }
}
</script>

<style lang="scss" src="./404Screen.scss"/>