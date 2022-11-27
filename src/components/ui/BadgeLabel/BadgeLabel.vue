<template>
  <div
    :class="className"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'BadgeLabel',

  computed: {
    className() {
      const classArray = ['badge-label']
      const backgrounds = [
        'badge-label_purple',
        'badge-label_orange',
        'badge-label_blue',
        'badge-label_pink',
        'badge-label_green'
        ]
      const colorCode = Math.floor(Math.random() * (5)) + 1
      classArray.push(backgrounds[colorCode - 1])
      return classArray.join(' ')
    }
  }
}
</script>

<style lang="scss" src="./BadgeLabel.scss"/>