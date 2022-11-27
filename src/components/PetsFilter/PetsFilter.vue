<template>
  <div
    v-if="screenType !== 'mobile'"
    class="pets-filter"
  >
    <PetsFilterItem
      v-for="(item, index) in petsCategories"
      :key="index"
      :id="item.id"
      :checked="modelValue[item.id]"
      @click="clickFilterItem(item.id)"
    >
      {{ item.name }}
    </PetsFilterItem>
  </div>
  <div
    v-else
    class="pets-filter"
  >
    <Swiper
      :breakpoints="filterSwiperBreakpoints"
      :grab-cursor="true"
      class="pets-filter__swiper"
    >
      <SwiperSlide
        v-for="(item, index) in petsCategories"
        :key="index"
      >
        <PetsFilterItem
          :id="item.id"
          :checked="modelValue[item.id]"
          @click="clickFilterItem(item.id)"
        >
          {{ item.name }}
        </PetsFilterItem>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import PetsFilterItem from '@/components/PetsFilterItem/PetsFilterItem.vue'
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'

export default {
  name: 'PetsFilter',

  components: {
    PetsFilterItem,
    Swiper,
    SwiperSlide
  },

  props: {
    modelValue: {
      type: Object
    }
  },

  emits: [
    'update:modelValue'
  ],

  data() {
    return {
      filterSwiperBreakpoints: {
        0: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        490: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        605: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }
    }
  },

  computed: {
    ...mapGetters({
      petsCategories: 'getPetsCategories',
      screenType: 'getScreenType'
    }),
  },

  methods: {
    clickFilterItem(id) {
      this.modelValue[id] = !this.modelValue[id]
      this.$emit('update:modelValue', this.modelValue)
    }
  }
}
</script>

<style lang="scss" src="./PetsFilter.scss"/>