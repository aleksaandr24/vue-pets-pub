<template>
  <section class="home__greeting">
    <HomeGreeting/>
  </section>
  <section
    v-if="screenType !== 'mobile'"
    class="home__progress"
  >
    <HomeProgress/>
  </section>
  <section
    v-else
    class="home__progress"
  >
    <Swiper
      :slides-per-view="1"
      :space-between="30"
      :grab-cursor="true"
      class="home-progress-swiper"
    >
      <SwiperSlide>
        <HomeProgress/>
      </SwiperSlide>
      <SwiperSlide>
        <HomeTimeDate/>
      </SwiperSlide>
    </Swiper>
  </section>
  <section
    v-if="screenType !== 'mobile'"
    class="home__time-date"
  >
    <HomeTimeDate/>
  </section>
  <section class="home__posts">
    <HomePosts/>
  </section>
  <section class="home__pets">
    <HomePets/>
  </section>
  <section class="home__chat-now">
    <HomeChatNow/>
  </section>
  <section class="home__user-pets">
    <HomeUserPets/>
  </section>
</template>

<script>
import HomeGreeting from '@/components/HomeGreeting/HomeGreeting.vue'
import HomeProgress from '@/components/HomeProgress/HomeProgress.vue'
import HomePosts from '@/components/HomePosts/HomePosts.vue'
import HomePets from '@/components/HomePets/HomePets.vue'
import HomeTimeDate from '@/components/HomeTimeDate/HomeTimeDate.vue'
import HomeChatNow from '@/components/HomeChatNow/HomeChatNow.vue'
import HomeUserPets from '@/components/HomeUserPets/HomeUserPets.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import pageLoading from '@/mixins/pageLoading.js'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeScreen',

  components: {
    HomeGreeting,
    HomeProgress,
    HomeTimeDate,
    HomePosts,
    HomePets,
    HomeChatNow,
    HomeUserPets,
    Swiper,
    SwiperSlide
  },

  mixins: [
    pageLoading
  ],

  computed: {
    ...mapGetters({
      screenType: 'getScreenType'
    })
  }
}
</script>

<style lang="scss" src="./HomeScreen.scss"/>