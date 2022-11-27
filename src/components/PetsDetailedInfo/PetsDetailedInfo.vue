<template>
  <div class="pet-info">
    <div class="pet-info__name">
      <h2 class="pet-info__title">
        <span class="pet-info__title_primary">{{ currentPet.name }},</span>
        <span class="pet-info__title_secondary">
          <IconBase
            :icon-props="iconPetLocationProps"
          >
            <IconPetLocation/>
          </IconBase>
          {{ currentPet.location }}
        </span>
      </h2>
    </div>
    <div class="pet-info__type">
      {{ currentPet.type }}
      <IconBase
        :icon-props="iconPetTypeDotProps"
      >
        <IconPetTypeDot/>
      </IconBase>
      {{ currentPetBadge }}
    </div>
    <div class="pet-info__likes">
      <BadgeLike
        :liked="currentPet.likedByUser"
        @event-like="(incrementValue) => changePetLikes({petID: this.$route.params.id, increment: incrementValue})"
        class="pet-info__badge-like"
      />
      <BadgeCounter
        :likes="currentPet.likes"
        class="pet-info__counter"
      />
      <div
        v-if="currentPet.price !== undefined"
        class="pet-info__price"
      >
        <IconBase
          :icon-props="iconPetPriceProps"
        >
          <IconPetPrice/>
        </IconBase>
        {{ currentPet.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}) }}
      </div>
    </div>
    <div class="pet-info__props">
      <div class="pet-info__age-title">Возраст</div>
      <div class="pet-info__age-value">{{ currentPetAge }}</div>
      <div class="pet-info__weight-title">Вес</div>
      <div class="pet-info__weight-value">{{ currentPetWeight }}</div>
      <div class="pet-info__sex-title">Пол</div>
      <div class="pet-info__sex-value">{{ currentPetSex }}</div>
    </div>
    <h3 class="pet-info__subtitle">Описание</h3>
    <div class="pet-info__text">
      {{ currentPet.about}}
    </div>
    <div class="pet-info__buttons">
      <BaseButton
        v-if="currentPet.price !== undefined"
        class="pet-info__button"
      >
        Купить - {{ currentPet.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}) }}
      </BaseButton>
      <BaseButton
        v-if="currentPet.adopt"
        class="pet-info__button"
      >
        Приютить
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BadgeLike from '@/components/ui/BadgeLike/BadgeLike.vue'
import BadgeCounter from '@/components/ui/BadgeCounter/BadgeCounter.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import IconBase from '@/components/ui/IconBase/IconBase.vue'
import IconPetLocation from '@/components/ui/IconPetLocation/IconPetLocation.vue'
import IconPetTypeDot from '@/components/ui/IconPetTypeDot/IconPetTypeDot.vue'
import IconPetPrice from '@/components/ui/IconPetPrice/IconPetPrice.vue'
import petBadgeLabel from '@/helpers/petBadgeLabel.js'
import declOfNum from '@/helpers/declOfnUm.js'
import { mapActions } from 'vuex'

export default {
  name: 'PetsDetailedInfo',

  components: {
    BadgeLike,
    BadgeCounter,
    BaseButton,
    IconBase,
    IconPetLocation,
    IconPetTypeDot,
    IconPetPrice
  },

  props: {
    currentPet: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      iconPetLocationProps: {
        width: {
          'desktop': 46,
          'laptop': 25,
          'tablet': 25,
          'mobile': 22
        },
        height: {
          'desktop': 64,
          'laptop': 35,
          'tablet': 35,
          'mobile': 30
        },
        fill: {
          'light': '#0F172A',
          'dark': '#EDF2F7'
        },
        stroke: {
          'light': '#0F172A',
          'dark': '#EDF2F7'
        }
      },

      iconPetTypeDotProps: {
        width: {
          'desktop': 6,
          'laptop': 6,
          'tablet': 3,
          'mobile': 3
        },
        height: {
          'desktop': 6,
          'laptop': 6,
          'tablet': 3,
          'mobile': 3
        },
        fill: {
          'light': '#98A1BD',
          'dark': '#98A1BD'
        },
        stroke: {
          'light': '#98A1BD',
          'dark': '#98A1BD'
        }
      },

      iconPetPriceProps: {
        width: {
          'desktop': 28,
          'laptop': 22,
          'tablet': 18,
          'mobile': 16
        },
        height: {
          'desktop': 28,
          'laptop': 22,
          'tablet': 18,
          'mobile': 16
        },
        fill: {
          'light': 'none',
          'dark': 'none'
        },
        stroke: {
          'light': 'none',
          'dark': 'none'
        }
      }
    }
  },

  computed: {
    currentPetBadge() {
      const {groupID, age, sex} = this.currentPet
      return petBadgeLabel(groupID, age, sex)
    },

    currentPetAge() {
      const nowDate = new Date()
      const petDate = new Date(this.currentPet.age)
      const petAge = nowDate.getFullYear() - petDate.getFullYear()
      return `${petAge} ${declOfNum(petAge, ['год', 'года', 'лет'])}`
    },

    currentPetWeight() {
      return `${this.currentPet.weight} кг`
    },

    currentPetSex() {
      return this.currentPet.sex ? 'Мужской' : 'Женский'
    }
  },

  methods: {
    ...mapActions([
      'changePetLikes'
    ])
  }
}
</script>

<style lang="scss" src="./PetsDetailedInfo.scss"/>