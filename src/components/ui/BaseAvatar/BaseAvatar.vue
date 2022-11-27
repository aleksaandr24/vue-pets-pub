<template>
  <div
    :class="`base-avatar base-avatar_${size}`"
  >
    <div
      v-show="online"
      :class="`base-avatar__badge base-avatar__badge_${size}`"
    >
    </div>
    <div
      :class="`base-avatar__circle base-avatar__circle_${size} ${backgroundColorClass}`"
    >
      <img
        v-if="showPicture"
        :src="picture"
        class="base-avatar__picture"
      >
      <div
        v-else
        :class="`base-avatar__name base-avatar__name_${size}`"
      >
        {{ userName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAvatar',

  props: {
    size: {
      type: String,
      default: 'xs'
    },

    online: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      default: 'user name'
    },

    picture: {
      type: String,
      default: ''
    }
  },

  computed: {
    userName() {
      let nameArray = this.name.split(' ', 2)
      let userLiters = []
      if (nameArray.length > 1) {
        userLiters = nameArray.map(el => el.charAt(0))
      }
      else {
        userLiters.push(nameArray[0].charAt(0))
      }
      return userLiters.join('').toUpperCase()
    },

    backgroundColorClass() {
      const backgrounds = [
        'base-avatar__circle_purple',
        'base-avatar__circle_orange',
        'base-avatar__circle_yellow',
        'base-avatar__circle_pink',
        'base-avatar__circle_green'
        ]
      const colorCode = Math.floor(Math.random() * (5)) + 1
      return backgrounds[colorCode - 1]
    },

    showPicture() {
      return ((this.picture !== '') && (this.picture !== null)) ? true : false
    }
  }
}
</script>

<style lang="scss" src="./BaseAvatar.scss"/>