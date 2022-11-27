<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <router-link to="/">
        <BaseLogo
          :size="'md'"
        />
      </router-link>
    </div>
    <nav class="sidebar__menu">
      <ul class="menu-list">
        <router-link
          class="menu-list__link menu-list__home"
          to="/home"
        >
          <li class="menu-list__item"></li>
        </router-link>
        <router-link
          :class="['menu-list__link menu-list__pets',
                  {'router-link-active': this.$route.name === 'pets-detailed'}]"
          to="/pets"
        >
          <li class="menu-list__item"></li>
        </router-link>
        <router-link
          class="menu-list__link menu-list__blog"
          to="/blog"
        >
          <li class="menu-list__item"></li>
        </router-link>
        <router-link
          class="menu-list__link menu-list__chat"
          to="/chat"
        >
          <li class="menu-list__item"></li>
        </router-link>
        <router-link
          class="menu-list__link menu-list__profile"
          to="/profile"
        >
          <li class="menu-list__item"></li>
        </router-link>
      </ul>
    </nav>
    <div
      @click="doLogout"
      class="sidebar__logout"
    >
      <IconBase
        :icon-props="iconSidebarLogoutProps"
      >
        <IconSidebarLogout/>
      </IconBase>
    </div>
  </aside>
</template>

<script>
import BaseLogo from '@/components/ui/BaseLogo/BaseLogo.vue'
import IconBase from '@/components/ui/IconBase/IconBase.vue'
import IconSidebarLogout from '@/components/ui/IconSidebarLogout/IconSidebarLogout.vue'
import userLogout from '@/mixins/userLogout'

export default {
  name: 'TheSidebarDesktop',

  components: {
    BaseLogo,
    IconBase,
    IconSidebarLogout
  },

  mixins: [
    userLogout
  ],

  data() {
    return {
      iconSidebarLogoutProps: {
        width: {
          'desktop': 24,
          'laptop': 24,
          'tablet': 24,
          'mobile': 24
        },
        height: {
          'desktop': 24,
          'laptop': 24,
          'tablet': 24,
          'mobile': 24
        },
        fill: {
          'light': '#0F172A',
          'dark': '#EDF2F7'
        },
        stroke: {
          'light': '#0F172A',
          'dark': '#EDF2F7'
        }
      }
    }
  },

  
}
</script>

<style lang="scss" src="./TheSidebarDesktop.scss"/>