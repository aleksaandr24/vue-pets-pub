<template>
  <div class="home-pets">
    <Swiper
      :modules="modules"
      :breakpoints="petsSwiperBreakpoints"
      :navigation="petsSwiperNavigation"
      :grab-cursor="true"
      class="home-pets__swiper"
    >
      <SwiperSlide
        v-for="(item, index) in pets"
        :key="index"
      >
        <router-link
          class="home-pets__link"
          :to="`/pets/${index}`"
        >
          <BaseCard
            class="home-pets__card"
          >
            <div class="home-pets__picture">
              <img
                :src="item.previewImg"
                alt="Pets picture"
                class="home-pets__img"
            />
            </div>
            <div class="home-pets__name">
              <h3 class="home-pets__title">
                {{ item.name }}
              </h3>
            </div>
            <div class="home-pets__badges">
              <BadgeLabel class="home-pets__label">
                {{ petBadge(index) }}
              </BadgeLabel>
              <BadgeCounter
                :likes="item.likes"
              />
              <BadgeLike
                :liked="item.likedByUser"
                @click.prevent
                @event-like="(incrementValue) => changePetLikes({petID: index, increment: incrementValue})"
                class="home-pets__like"
              />
            </div>
          </BaseCard>
        </router-link>
      </SwiperSlide>
      <div
        v-if="screenType !== 'mobile'"
        class="pets-swiper-button-prev"
      >
        <CarouselControl
          prev
        />
      </div>
      <div
        v-if="screenType !== 'mobile'"
        class="pets-swiper-button-next"
      >
        <CarouselControl/>
      </div>
    </Swiper>
  </div>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import CarouselControl from '@/components/ui/CarouselControl/CarouselControl.vue'
import BadgeLike from '@/components/ui/BadgeLike/BadgeLike.vue'
import BadgeCounter from '@/components/ui/BadgeCounter/BadgeCounter.vue'
import BadgeLabel from '@/components/ui/BadgeLabel/BadgeLabel.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
import petBadgeLabel from '@/helpers/petBadgeLabel.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomePets',

  components: {
    BaseCard,
    CarouselControl,
    BadgeLike,
    BadgeCounter,
    BadgeLabel,
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
      petsSwiperBreakpoints: {
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
          slidesPerView: 2,
          spaceBetween: 40
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      screenType: 'getScreenType',
      pets: 'getPets',
    }),
    
    petsSwiperNavigation() {
      return this.screenType === 'mobile' ? false : {
          nextEl: '.pets-swiper-button-next',
          prevEl: '.pets-swiper-button-prev'
        }
    }
  },

  methods: {
    ...mapActions([
      'changePetLikes'
    ]),

    petBadge(index) {
      const {groupID, age, sex} = this.pets[index]
      return petBadgeLabel(groupID, age, sex)
    }
  }
}
</script>

<style lang="scss" src="./HomePets.scss"/>