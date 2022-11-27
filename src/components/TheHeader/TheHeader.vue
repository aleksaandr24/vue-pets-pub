<template>
  <header class="header">
    <div class="header__page-name">
      <h1 class="header__page-title">
        <router-link
          v-if="this.$route.name === 'pets-detailed'"
          to="/pets"
          class="title-link"
        >
          <IconBase
            :icon-props="iconHeaderArrowProps"
          >
            <IconHeaderArrow/>
          </IconBase>
        </router-link>
        {{ this.$route.meta['title'] }}
        <span
          v-if="this.$route.name === 'pets-detailed'"
          class="title-name"
        >
          {{ petName }}
        </span>
      </h1>
    </div>
    <div class="header__themes">
      <TheHeaderThemeSwitch
        v-model="currentTheme"
        :elemID="'themeSwitch'"
        :elemChecked="themeSwitchChecked"
        :elemDisabled="false"
      />
    </div>
    <div class="header__icons">
      <TheHeaderNotifications/>
      <BaseAvatar
        :size="avatarSize"
        :name="userName"
        class="header__avatar"
      />
    </div>
  </header>
</template>

<script>
import BaseAvatar from '@/components/ui/BaseAvatar/BaseAvatar.vue'
import IconBase from '@/components/ui/IconBase/IconBase.vue'
import IconHeaderArrow from '@/components/ui/IconHeaderArrow/IconHeaderArrow.vue'
import TheHeaderThemeSwitch from '@/components/TheHeaderThemeSwitch/TheHeaderThemeSwitch.vue'
import TheHeaderNotifications from '@/components/TheHeaderNotifications/TheHeaderNotifications.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheHeader',

  components: {
    BaseAvatar,
    IconBase,
    IconHeaderArrow,
    TheHeaderThemeSwitch,
    TheHeaderNotifications
  },

  data() {
    return {
      currentTheme: {},

      iconHeaderArrowProps: {
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

  computed: {
    ...mapGetters({
      appTheme: 'getAppTheme',
      userName: 'getUserName',
      screenType: 'getScreenType',
      pets: 'getPets'
    }),

    themeSwitchChecked() {
      return this.appTheme === 'light'
    },

    avatarSize() {
      return this.screenType === 'mobile' ? 'sm' : 'md'
    },

    petName() {
      return this.pets[this.$route.params.id].name
    }
  },

  watch: {
    currentTheme(newValue) {
      if (newValue.checked) {
        this.changeTheme('light')
      } else {
        this.changeTheme('dark')
      }
    }
  },

  methods: {
    ...mapActions([
      'changeAppTheme'
    ]),
    
    changeTheme(appTheme) {
      this.changeAppTheme(appTheme)
      if (appTheme === 'dark') {
        document.body.setAttribute('theme', 'dark')
      } else {
        document.body.removeAttribute('theme')
      }
    }
  }
}
</script>

<style lang="scss" src="./TheHeader.scss"/>