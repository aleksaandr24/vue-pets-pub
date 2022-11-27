<template>
  <component
    :is="layout"
    :loader="showLoader"
  >
    <router-view
      v-slot="{ Component }"
    >
      <Transition
        v-if="layout === 'only-main'"
        name="ct">
        <component
          :is="Component"
        />
      </Transition>
      <component
        v-else
        :is="Component"
        @show-loader="(status) => showLoader = status"
      />
    </router-view>
  </component>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { firebaseAuth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'App',

  data() {
    return {
      showLoader: false
    }
  },

  computed: {
    ...mapGetters({
      theme: 'getAppTheme',
      userAuth: 'getUserAuth'
    }),

    layout() {
      return this.$route.meta.layout || 'default-layout'
    }

  },

  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
    
    window.addEventListener('resize', this.onResize)
    
    if (this.theme === 'dark') {
      document.body.setAttribute('theme', 'dark')
    }

    this.onResize()
    this.downloadPosts()
    this.downloadPets()
    this.downloadUserPets()
    this.downloadPetsCategories()
  },

  beforeUpdate() {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        this.changeUserAuth({auth: true, uid: user.uid})
      } else {
        this.changeUserAuth({auth: false, uid: null})
      }
    })
    
    const excludePaths = ['loading', 'start', 'login', 'registration']
    
    if ((!this.userAuth) && (!excludePaths.includes(this.$route.name))) {
      this.$router.push({name: 'loading'})
    }
  },

  updated() {
    if (this.$route.meta.layout === 'only-main') {
      document.querySelector('#app').classList.add('app_only-main')
    } else {
      document.querySelector('#app').classList.remove('app_only-main')
    }
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    ...mapActions([
      'changeScreenWidth',
      'changeScreenHeight',
      'changeScreenType',
      'downloadPosts',
      'downloadPets',
      'downloadUserPets',
      'downloadPetsCategories',
      'changeUserAuth'
    ]),

    onResize() {
      this.changeScreenWidth(window.innerWidth)
      this.changeScreenHeight(window.innerHeight)
      this.changeScreenType()
    }
  }
}
</script>

<style lang="scss" src="./App.scss"/>