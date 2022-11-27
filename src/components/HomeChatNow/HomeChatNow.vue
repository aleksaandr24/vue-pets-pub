<template>
  <BaseCard
    class="chatnow__card"
  >
    <div class="chatnow__avatars">
      <BaseAvatar
        v-for="(item, index) in chatUsers"
        :key="index"
        :size="'lg'"
        :name="item"
        class="chatnow__avatar"
      />
      <div class="chatnow__add">
        <IconBase
          :icon-props="iconDashedCircleProps"
          class="chatnow__circle"
        >
          <IconDashedCircle/>
        </IconBase>
      </div>
    </div>
    <div class="chatnow__button">
      <BaseButton
        class="chatnow__btn"
      >
        Напиши сейчас
      </BaseButton>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import BaseAvatar from '@/components/ui/BaseAvatar/BaseAvatar.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import IconBase from '@/components/ui/IconBase/IconBase.vue'
import IconDashedCircle from '@/components/ui/IconDashedCircle/IconDashedCircle.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeChatNow',

  components: {
    BaseCard,
    BaseAvatar,
    BaseButton,
    IconBase,
    IconDashedCircle
  },

  data() {
    return {
      iconDashedCircleProps: {
        width: {
          'desktop': 62,
          'laptop': 62,
          'tablet': 62,
          'mobile': 62
        },
        height: {
          'desktop': 62,
          'laptop': 62,
          'tablet': 62,
          'mobile': 62
        },
        fill: {
          'light': '#17171B',
          'dark': '#FFFFFF'
        },
        stroke: {
          'light': '#17171B',
          'dark': '#FFFFFF'
        }
      },
    }
  },

  computed: {
    ...mapGetters({
      screenType: 'getScreenType',
      posts: 'getPosts'
    }),
    
    chatUsers() {
      const usersLimit = {
        'mobile': 6,
        'tablet': 5,
        'laptop': 3,
        'desktop': 5
      }
      const authors = []
      for (let i = 0; i < usersLimit[this.screenType]; i++ ) {
        authors.push(this.posts[i].author)
      }
      return authors
    }
  }
}
</script>

<style lang="scss" src="./HomeChatNow.scss"/>