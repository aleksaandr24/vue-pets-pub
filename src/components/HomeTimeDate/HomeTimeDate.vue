<template>
  <div class="time-date">
    <BaseCard
      class="time-date__card"
    >
      <h3 class="time-date__title">
        <img
          v-if="screenType !== 'laptop'"
          class="time-date__icon"
          src="@/assets/images/HomeTimeDate/icon-clocks.svg"
          alt="Time"
        />
        На часах у нас
      </h3>
      <span class="time-date__time-value">{{ currentTime }}</span>
    </BaseCard>
    <BaseCard
      class="time-date__card"
    >
      <h3 class="time-date__title">
        <img
          v-if="screenType !== 'laptop'"
          class="time-date__icon"
          src="@/assets/images/HomeTimeDate/icon-calendar.svg"
          alt="Date"
        />
        На календаре у нас
      </h3>
      <span class="time-date__date-value">{{ currentDate }}</span>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeTimeDate',

  components: {
    BaseCard
  },

  data() {
    return {
      nowDate: new Date()
    }
  },

  computed: {
    ...mapGetters({
      screenType: 'getScreenType'
    }),
    
    currentDate() {
      return this.nowDate.toLocaleDateString('ru-RU')
    },

    currentTime() {
      return this.nowDate.toLocaleTimeString('ru-RU', {hour: 'numeric', minute:'2-digit'})
    }
  },

  mounted() {
    setInterval(() => {
      this.nowDate = new Date()
    }, 1000)
  }
}
</script>

<style lang="scss" src="./HomeTimeDate.scss"/>