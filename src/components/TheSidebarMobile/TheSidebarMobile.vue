<template>
  <aside class="sidebar-mobile">
    <div class="sidebar-mobile__menu-icon">
      <button
        @click="changeMobileMenuOpen(true)"
        type="button"
        class="sidebar-mobile__menu-button"
      >
      </button>
      <Transition name="mobile-menu">
        <div
          v-if="mobileMenuOpen"
          class="mobile-menu"
        >
          <button
            @click="changeMobileMenuOpen(false)"
            type="button"
            class="mobile-menu__close-button"
          >
          </button>
          <div class="mobile-menu__container">
            <ul class="mobile-menu__list">
              <router-link
                @click="changeMobileMenuOpen(false)"
                class="mobile-menu__link"
                to="/home"
              >
                <li class="mobile-menu__item">
                  <div class="mobile-menu__home"></div>
                  <div class="mobile-menu__title">Home</div>
                </li>
              </router-link>
              <router-link
                @click="changeMobileMenuOpen(false)"
                class="mobile-menu__link"
                to="/pets"
              >
                <li class="mobile-menu__item">
                  <div class="mobile-menu__pets"></div>
                  <div class="mobile-menu__title">Pets</div>
                </li>
              </router-link>
              <router-link
                @click="changeMobileMenuOpen(false)"
                class="mobile-menu__link"
                to="/blog"
              >
                <li class="mobile-menu__item">
                  <div class="mobile-menu__blog"></div>
                  <div class="mobile-menu__title">Blog</div>
                </li>
              </router-link>
              <router-link
                @click="changeMobileMenuOpen(false)"
                class="mobile-menu__link"
                to="/chat"
              >
                <li class="mobile-menu__item">
                  <div class="mobile-menu__chat"></div>
                  <div class="mobile-menu__title">Chat</div>
                </li>
              </router-link>
              <router-link
                @click="changeMobileMenuOpen(false)"
                class="mobile-menu__link"
                to="/profile"
              >
                <li class="mobile-menu__item">
                  <div class="mobile-menu__profile"></div>
                  <div class="mobile-menu__title">Profile</div>
                </li>
              </router-link>
            </ul>
            <div
              @click="doLogout(); changeMobileMenuOpen(false)"
              class="mobile-menu__logout-item"
            >
              <div class="mobile-menu__logout"></div>
              <div class="mobile-menu__title">Logout</div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </aside>
</template>

<script>
import userLogout from '@/mixins/userLogout'

export default {
  name: 'TheSidebarMobile',

  mixins: [
    userLogout
  ],

  data() {
    return {
      mobileMenuOpen: false
    }
  },

  methods: {
    changeMobileMenuOpen(status) {
      this.mobileMenuOpen = status
    }
  }
}
</script>

<style lang="scss" src="./TheSidebarMobile.scss"/>