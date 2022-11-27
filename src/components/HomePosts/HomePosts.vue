<template>
  <Swiper
    :modules="modules"
    :breakpoints="postsSwiperBreakpoints"
    :navigation="postsSwiperNavigation"
    :grab-cursor="true"
    class="posts-swiper"
  >
    <SwiperSlide
      v-for="(postItem, postIndex) in posts"
      :key="postIndex"
    >
      <BaseCard
        class="posts-card"
      >
        <div class="posts-card__user-panel">
          <BaseAvatar
            :size="'md'"
            :name="postItem.author"
            :picture="postItem.avatar"
            class="posts-card__avatar"
          />
          <div class="posts-card__user-name">
            {{ postItem.author }}
          </div>
          <div class="posts-card__user-status">
            {{ postItem.status }}
          </div>
          <div class="posts-card__user-time">
            {{ postItem.time.split(' ')[1] }}
          </div>
        </div>
        <div class="posts-card__user-text">
          {{ postItem.body }}
        </div>
      </BaseCard>
    </SwiperSlide>
    <div
      v-if="screenType !== 'mobile'"
      class="posts-swiper__button-prev"
    >
      <CarouselControl
        prev
      />
    </div>
    <div
      v-if="screenType !== 'mobile'"
      class="posts-swiper__button-next"
    >
      <CarouselControl/>
    </div>
  </Swiper>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import CarouselControl from '@/components/ui/CarouselControl/CarouselControl.vue'
import BaseAvatar from '@/components/ui/BaseAvatar/BaseAvatar.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { mapGetters } from 'vuex'

export default {
  name: 'HomePosts',

  components: {
    BaseCard,
    BaseAvatar,
    CarouselControl,
    Swiper,
    SwiperSlide
  },

  setup() {
    return {
      modules: [Navigation]
    }
  },

  data() {
    return {
      postsSwiperBreakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1920: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      screenType: 'getScreenType',
      posts: 'getPosts',
    }),
    
    postsSwiperNavigation() {
      return this.screenType === 'mobile' ? false : {
          nextEl: '.posts-swiper__button-next',
          prevEl: '.posts-swiper__button-prev'
        }
    },
  }
}
</script>

<style lang="scss" src="./HomePosts.scss"/>