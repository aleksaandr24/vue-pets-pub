<template>
  <div
    v-if="currentPet.images.length > 1"
    class="pet-gallery"
  >
    <Swiper
      :modules="modules"
      :effect="'creative'"
      :navigation="petGalleryNavigation"
      :pagination="petGalleryPagination"
      :breakpoints="petGalleryBreakpoints"
      :grab-cursor="true"
      class="pet-gallery__swiper"
    >
      <SwiperSlide
        v-for="(item, index) in currentPet.images"
        :key="index"
        class="pet-gallery__slide"
      >
        <img
          :src="item"
          :alt="`${currentPet.name} Image ${index + 1}`"
          class="pet-gallery__img"
        />
      </SwiperSlide>
    </Swiper>
    <CarouselControl
      prev
      class="pet-gallery__control pet-gallery__control_prev"
    />
    <CarouselControl
      class="pet-gallery__control pet-gallery__control_next"
    />
  </div>
  <div
    v-else
    class="pet-gallery-single"
  >
    <img
      :src="currentPet.images[0]"
      :alt="`${currentPet.name} Image`"
      class="pet-gallery-single__img"
    />
  </div>
</template>

<script>
import CarouselControl from '@/components/ui/CarouselControl/CarouselControl.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCreative, Navigation, Pagination } from 'swiper'
import 'swiper/scss'
import 'swiper/css/effect-creative'
import 'swiper/scss/navigation'
import 'swiper/css/pagination'

export default {
  name: 'PetsDetailedGallery',

  components: {
    Swiper,
    SwiperSlide,
    CarouselControl
  },

  props: {
    currentPet: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {
      modules: [EffectCreative, Navigation, Pagination]
    }
  },

  data() {
    return {
      petGalleryBreakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          creativeEffect: {
            prev: {
              shadow: true,
              scale: 1,
              translate: [0, 0, -400],
            },
            next: {
              scale: 1,
              translate: ['100%', 0, 0],
            },
          },
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 20,
          creativeEffect: {
            prev: {
              shadow: true,
              scale: 1,
              translate: [0, 0, -400],
            },
            next: {
              scale: 1,
              translate: ['100%', 0, 0],
            },
          },
        },
        1280: {
          slidesPerView: 1,
          spaceBetween: 0,
          creativeEffect: {
            prev: {
              shadow: true,
              scale: 0.87,
              translate: [-60, 0, 0],
            },
            next: {
              scale: 0.87,
              translate: [60, 0, 0],
            }
          },
        },
        1920: {
          slidesPerView: 1,
          spaceBetween: 0,
          creativeEffect: {
            prev: {
              shadow: true,
              scale: 0.87,
              translate: [-104, 0, 0],
            },
            next: {
              scale: 0.87,
              translate: [104, 0, 0],
            }
          },
        }
      },
      
      petGalleryNavigation: {
        nextEl: '.pet-gallery__control_next',
        prevEl: '.pet-gallery__control_prev'
      },

      petGalleryPagination: {
        type: 'bullets',
        dynamicBullets: true
      }
    }
  },
}
</script>

<style lang="scss" src="./PetsDetailedGallery.scss"/>