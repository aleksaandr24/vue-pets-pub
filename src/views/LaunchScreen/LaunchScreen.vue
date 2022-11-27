<template>
  <main class="main launch">
    <BaseLogo
      :size="logoSize"
      class="launch__logo"
    />
    <h1 class="launch__title">Pets</h1>
  </main>
</template>

<script>
import BaseLogo from '@/components/ui/BaseLogo/BaseLogo.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'LaunchScreen',

  components: {
    BaseLogo
  },

  computed: {
    ...mapGetters({
      screenType: 'getScreenType',
      userAuth: 'getUserAuth'
    }),
    
    logoSize() {
      return this.screenType === 'mobile' ? 'lg' : 'xl'
    }
  },

  mounted() {
    setTimeout(() => {
      if (this.userAuth) {
        this.$router.push({name: 'home'})
      } else {
        this.$router.push({name: 'start'})
      }
    }, 2000)
  }
}
</script>

<style lang="scss" src="./LaunchScreen.scss"/>