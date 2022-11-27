<template>
  <div
    :class="['pets-filter-item', {'pets-filter-item_checked': checked}]"
  >
    <img
      v-if="id === 1"
      class="pets-filter-item__icon"
      src="@/assets/images/PetsFilterItem/filter-icon-dogs.svg"
    >
    <img
      v-if="id === 2"
      class="pets-filter-item__icon"
      src="@/assets/images/PetsFilterItem/filter-icon-cats.svg"
    >
    <img
      v-if="id === 3"
      class="pets-filter-item__icon"
      src="@/assets/images/PetsFilterItem/filter-icon-birds.svg"
    >
    <img
      v-if="id === 4"
      class="pets-filter-item__icon"
      src="@/assets/images/PetsFilterItem/filter-icon-hares.svg"
    >
    <img
      v-if="id === 5"
      class="pets-filter-item__icon"
      src="@/assets/images/PetsFilterItem/filter-icon-mice.svg"
    >
    <img
      v-if="id === 6"
      class="pets-filter-item__icon"
      src="@/assets/images/PetsFilterItem/filter-icon-other.svg"
    >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'PetsFilterItem',

  props: {
    id: {
      type: Number,
      default: 6
    },

    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" src="./PetsFilterItem.scss"/>