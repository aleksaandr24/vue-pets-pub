<template>
  <TheHeader/>
  <TheSidebarDesktop
    v-if="['laptop', 'desktop'].includes(screenType)"
  />
  <TheSidebarMobile
    v-else
  />
  <Transition name="loader">
    <BaseLoader
      v-if="loader"
    />
  </Transition>
  <main
    :class="['main', 
            {'home': this.$route.name === 'home'},
            {'pets': this.$route.name === 'pets'},
            {'pets-detailed': this.$route.name === 'pets-detailed'},
            {'blog': this.$route.name === 'blog'},
            {'chat': this.$route.name === 'chat'},
            {'profile': this.$route.name === 'profile'},
            {'ui-kit': this.$route.name === 'UIKit'},
            {'error-404': this.$route.name === 'error404'}]"
  >
    <slot/>
  </main>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheSidebarDesktop from '@/components/TheSidebarDesktop/TheSidebarDesktop.vue'
import TheSidebarMobile from '@/components/TheSidebarMobile/TheSidebarMobile.vue'
import BaseLoader from '@/components/ui/BaseLoader/BaseLoader.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',

  components: {
    TheHeader,
    TheSidebarDesktop,
    TheSidebarMobile,
    BaseLoader
  },

  props: {
    loader: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      screenType: 'getScreenType'
    })
  }
}
</script>

<style lang="scss" src="./DefaultLayout.scss"/>