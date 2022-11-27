<template>
  <MasonryWall
      :items="catalogItems"
      :column-width="catalogColumnWidth[screenType]"
      :gap="catalogColumnGap[screenType]"
    >
      <template #default="{ item, index }">
        <router-link
          class="catalog-item__link"
          :to="`/pets/${ item.id }`"
        >
          <BaseCard
            :key="index"
            :style="`height: ${ 249 * (Math.random(index) + 1) }px`"
            class="catalog-item"
          >
            <div
              class="catalog-item__picture"
            >
              <img
                :src="item.previewImg"
                :alt="`${ item.name } picture`"
                class="catalog-item__img"
              />
            </div>
            <div class="catalog-item__name">
              <h3 class="catalog-item__title">
                {{ item.name }}
              </h3>
            </div>
            <div class="catalog-item__badges">
              <BadgeLabel class="catalog-item__label">
                {{ petBadge(item.id) }}
              </BadgeLabel>
              <BadgeCounter
                :likes="item.likes"
              />
              <BadgeLike
                :liked="item.likedByUser"
                @click.prevent
                @event-like="(incrementValue) => changePetLikes({petID: item.id, increment: incrementValue})"
                class="catalog-item__like"
              />
            </div>
          </BaseCard>
        </router-link>
      </template>
    </MasonryWall>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import BadgeLike from '@/components/ui/BadgeLike/BadgeLike.vue'
import BadgeCounter from '@/components/ui/BadgeCounter/BadgeCounter.vue'
import BadgeLabel from '@/components/ui/BadgeLabel/BadgeLabel.vue'
import petBadgeLabel from '@/helpers/petBadgeLabel.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PetsCatalog',

  components: {
    BaseCard,
    BadgeLike,
    BadgeCounter,
    BadgeLabel
  },

  props: {
    catalogItems: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      catalogColumnWidth: {
        'desktop': 330,
        'laptop': 325,
        'tablet': 343,
        'mobile': 'auto'
      },

      catalogColumnGap: {
        'desktop': 40,
        'laptop': 20,
        'tablet': 30,
        'mobile': 30
      }
    }
  },

  computed: {
    ...mapGetters({
      screenType: 'getScreenType',
      screenHeight: 'getScreenHeight',
      pets: 'getPets'
    })
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

<style lang="scss" src="./PetsCatalog.scss"/>