<template>
  <section class="pets-detailed__gallery">
    <PetsDetailedGallery
      :currentPet="currentPet"
    />
  </section>
  <section class="pets-detailed__description">
    <PetsDetailedInfo
      :currentPet="currentPet"
    />
  </section>
</template>

<script>
import PetsDetailedGallery from '@/components/PetsDetailedGallery/PetsDetailedGallery.vue'
import PetsDetailedInfo from '@/components/PetsDetailedInfo/PetsDetailedInfo.vue'
import pageLoading from '@/mixins/pageLoading.js'
import { mapGetters } from 'vuex'

export default {
  name: 'PetsScreenDetailed',

  components: {
    PetsDetailedGallery,
    PetsDetailedInfo
  },

  mixins: [
    pageLoading
  ],

  computed: {
    ...mapGetters({
      pets: 'getPets'
    }),

    currentPet() {
      return this.pets[this.$route.params.id]
    }
  }
}
</script>

<style lang="scss" src="./PetsScreenDetailed.scss"/>