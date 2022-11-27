<template>
  <BaseCard
    class="user-pets__card"
  >
    <div
      class="user-pets__preview"
    >
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        :navigation="userPetsSwiperNavigation"
        :grab-cursor="true"
        @mouseover="userPetsSwiperNavigationShow = true"
        @mouseleave="userPetsSwiperNavigationShow = false"
        @slideChange="userPetsSwiperSlideChange"
        class="user-pets__swiper"
      >
        <SwiperSlide
          v-for="(userPet, keyPet) in userPets"
          :key="keyPet"
        >
          <div
            class="user-pets__picture"
          >
            <img
              src="https://loremflickr.com/360/360"
              :class="['user-pets__image', {'user-pets__image_shadow': userPetsSwiperNavigationShow}]"
              alt="user_pet_image"
            />
          </div>
        </SwiperSlide>
        <button
          v-show="userPetsSwiperNavigationShow"
          :disabled="userPetsSwiperNavigationDisabled"
          @click="switchUserPet('prev')"
          class="user-pets-swiper-button-prev"
        >
          <IconBase
            :icon-props="iconPetPictureControlProps"
          >
            <IconPetPictureControl/>
          </IconBase>
        </button>
        <button
          v-show="userPetsSwiperNavigationShow"
          :disabled="userPetsSwiperNavigationDisabled"
          @click="switchUserPet('next')"
          class="user-pets-swiper-button-next"
        >
          <IconBase
            :icon-props="iconPetPictureControlProps"
          >
            <IconPetPictureControl/>
          </IconBase>
        </button>
      </Swiper>
      <div class="user-pets__info">
        <h3 class="user-pets__title">{{ userPet.name }}</h3>
        <BadgeCounter
          :likes="userPet.likes"
          class="user-pets__likes"
        />
      </div>
    </div>
    <div class="user-pets__statistics">
      <div class="graphic">
        <div class="graphic__title">Лайки<div class="graphic__red-dot"></div>Просмотры<div class="graphic__green-dot"></div></div>
        <div class="graphic__diagram">
          <div
            v-for="(item, index) in weekdays"
            :key="index"
            class="graphic__item"
          >
            <div class="graphic__column">
              <div
                class="graphic__red-bar"
                :style="`--red-bar-percent: ${redBar[index]}%`"
              >
              </div>
              <div
                class="graphic__green-bar"
                :style="`--green-bar-percent: ${greenBar[index]}%`"
              >
              </div>
            </div>
            <div class="graphic__day">
              <div class="graphic__date">{{ item.date }}</div>
              <div class="graphic__weekday">{{ item.datename }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import BadgeCounter from '@/components/ui/BadgeCounter/BadgeCounter.vue'
import IconBase from '@/components/ui/IconBase/IconBase.vue'
import IconPetPictureControl from '@/components/ui/IconPetPictureControl/IconPetPictureControl.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { mapGetters } from 'vuex'

export default {
  name: 'HomeUserPets',

  components: {
    BaseCard,
    BadgeCounter,
    IconBase,
    IconPetPictureControl,
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
      userPetIndex: 0,
      userPetsSwiperNavigationShow: false,
      userPetsSwiperNavigationDisabled: false,
      iconPetPictureControlProps: {
        width: {
          'desktop': 11,
          'laptop': 11,
          'tablet': 11,
          'mobile': 11
        },
        height: {
          'desktop': 21,
          'laptop': 21,
          'tablet': 21,
          'mobile': 21
        },
        fill: {
          'light': '#EDF2F7',
          'dark': '#EDF2F7'
        },
        stroke: {
          'light': '#EDF2F7',
          'dark': '#EDF2F7'
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      userPets: 'getUserPets'
    }),

    userPet() {
      return this.userPets[this.userPetIndex]
    },
    
    userPetsSwiperNavigation() {
      if (this.userPets.length > 1) {
        return {
          nextEl: '.user-pets-swiper-button-next',
          prevEl: '.user-pets-swiper-button-prev'
        }
      }
      return false
    },

    weekdays() {
      const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
      const lastWeek = []
      for (let i = 0; i < 7; i++) {
        const day = new Date(new Date().getTime() - (24 * 60 * 60 * 1000) * i)
        lastWeek.push({date: day.getDate(), datename: days[day.getDay()]})
      }
      return lastWeek.reverse()
    },

    redBar() {
      const likesWeek = {}
      for (let i = 0; i < this.userPets.length; i++) {
        const animalLikes = []
        for (let j = 0; j < this.userPets[i]['graphic'].length; j++) {
          const item = this.userPets[i]['graphic'][j]
          const likes = Math.ceil(item['likes'] * 100 / (item['likes'] + item['views'] + 2))
          animalLikes.push(likes)
        }
        likesWeek[i] = animalLikes.reverse()
      }
      return likesWeek[this.userPetIndex]
    },

    greenBar() {
      const viewsWeek = []
      for (let i = 0; i < this.userPets.length; i++) {
        const animalViews = []
        for (let j = 0; j < this.userPets[i]['graphic'].length; j++) {
          const item = this.userPets[i]['graphic'][j]
          const views = Math.ceil(item['views'] * 100 / (item['likes'] + item['views'] + 2))
          animalViews.push(views)
        }
        viewsWeek[i] = animalViews.reverse()
      }
      return viewsWeek[this.userPetIndex]
    }
  },

  methods: {
    switchUserPet(direction) {
      const increment = direction === 'next' ? 1 : -1
      this.userPetsSwiperNavigationDisabled = true
      this.userPetIndex += increment
      this.userPetsSwiperNavigationDisabled = false
    },

    userPetsSwiperSlideChange(swiper) {
      this.userPetIndex = swiper.activeIndex
    }
  }
}
</script>

<style lang="scss" src="./HomeUserPets.scss"/>