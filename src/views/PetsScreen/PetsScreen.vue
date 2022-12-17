<template>
  <section class="pets__filter">
    <PetsFilter
      :model-value="filterItemsChecked"
      @update:model-value="onFilterUpdate()"
    />
  </section>
  <section class="pets__catalog">
    <PetsCatalog
      :catalogItems="catalogItems"
    />
  </section>
</template>

<script>
import PetsFilter from '@/components/PetsFilter/PetsFilter.vue'
import PetsCatalog from '@/components/PetsCatalog/PetsCatalog.vue'
import pageLoading from '@/mixins/pageLoading.js'
import { mapGetters } from 'vuex'

export default {
  name: 'PetsScreen',

  components: {
    PetsFilter,
    PetsCatalog
  },

  mixins: [
    pageLoading
  ],

  data() {
    return {
      filterItemsChecked: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false
      },
      catalogItems: []
    }
  },

  computed: {
    ...mapGetters({
      pets: 'getPets',
      screenType: 'getScreenType',
      screenHeight: 'getScreenHeight'
    }),

    catalogLoadLimits() {
      const smallHeight = this.screenHeight < 700
      return {
        'desktop': smallHeight ? 8 : 12,
        'laptop': smallHeight ? 7 : 10,
        'tablet': smallHeight ? 5 : 8,
        'mobile': smallHeight ? 4 : 6,
      }
    },

    filteredCatalog() {
      const catalog = []
      const checked = []
      const pets = this.pets
      for (let item in this.filterItemsChecked) {
        if (this.filterItemsChecked[item]) {
          checked.push(parseInt(item))
        }
      }
      if (checked.length < 1) {
        for (let i = 1; i < 7; i++) {
          checked.push(i)
        }
      }
      for (let item in pets) {
        if (checked.includes(pets[item].groupID)) {
          pets[item].id = item
          catalog.push(pets[item])
        }
      }
      return catalog
    }
  },

  mounted() {
    document.body.querySelector('.main').addEventListener('scroll', this.onCatalogScroll)
    this.loadCatalogItems()
  },

  beforeUnmount() {
    document.body.querySelector('.main').removeEventListener('scroll', this.onCatalogScroll)
  },

  methods: {
    loadCatalogItems(fromFirstItem = false) {
      const begin = fromFirstItem ? 0 : this.catalogItems.length
      const end = fromFirstItem ? (
        this.filteredCatalog.length > this.catalogLoadLimits[this.screenType]
        ? this.catalogLoadLimits[this.screenType]
        : this.filteredCatalog.length
      ) : (
        begin + this.catalogLoadLimits[this.screenType] > this.filteredCatalog.length
        ? this.filteredCatalog.length
        : begin + this.catalogLoadLimits[this.screenType]
      )
      for (let i = begin; i < end; i++) {
        this.catalogItems = [...this.catalogItems, this.filteredCatalog[i]]
      }
    },

    onFilterUpdate() {
      const debounce = (fn, delay) => {
        let timeout = null
        return (...args) => {
          if (timeout) clearTimeout(timeout)
          timeout = setTimeout(() => fn(...args), delay || 1000)
        }
      }
      debounce(() => {
        this.showPageLoader(1500)
        this.catalogItems = []
        this.loadCatalogItems(true)
      }, 3000)()
    },

    onCatalogScroll(e) {
      const { scrollTop, offsetHeight, scrollHeight } = e.target
			if ((scrollTop + offsetHeight) >= scrollHeight) {
				this.loadCatalogItems()
			}
    }
  }
}
</script>

<style lang="scss" src="./PetsScreen.scss"/>