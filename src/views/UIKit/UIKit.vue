<template>
  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">BaseInput & FloatLabel</h3>
      <div class="ui-kit__inputs">
        <FloatLabel
          class="ui-kit__regular-label"
        >
          <BaseInput
            v-model="baseInput1"
            :placeholder="'Введите текст'"
            :elemClass="'ui-kit__regular-input'"
          />
        </FloatLabel>
        <FloatLabel
          class="ui-kit__regular-label ui-kit__regular-label_success"
        >
          <BaseInput
            v-model="baseInput2"
            :placeholder="'Введено корректно'"
            :elemClass="'ui-kit__regular-input ui-kit__regular-input_success'"
            
          />
        </FloatLabel>
        <FloatLabel
          class="ui-kit__regular-label ui-kit__regular-label_danger"
        >
          <BaseInput
            v-model="baseInput3"
            :placeholder="'Введено с ошибкой'"
            :errorMessage="'Сообщение об ошибке'"
            :elemClass="'ui-kit__regular-input ui-kit__regular-input_danger'"
          />
        </FloatLabel>
      </div>
    </BaseCard>
  </div>
  
  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">BaseSelect</h3>
      <div class="ui-kit__selects">
        <BaseSelect
          v-model="baseSelect1"
          :elemData="selectData1"
        >
          Выберите пункты
        </BaseSelect>
          <BaseSelect
          v-model="baseSelect2"
          :elemData="selectData2"
          danger
        >
          Выберите пункты
        </BaseSelect>
      </div>
    </BaseCard>
  </div>
  
  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">BaseSwitch</h3>
      <div class="ui-kit__switches">
        <BaseSwitch
          v-for="(value, index) in switchData"
          v-model="baseSwitch[index]"
          :key="index"
          :elemID="value"
          :elemChecked="index === 0 ? true : false"
          :elemDisabled="index === 2 ? true : false"
        >
          {{ value }}
        </BaseSwitch>
      </div>
    </BaseCard>
  </div>
  
  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">BaseRadio</h3>
      <div class="ui-kit__radios">
        <BaseRadio
          v-for="(element, index) in radioData"
          v-model="baseRadio"
          :key="index"
          :elemName="'radio'"
          :elemValue="element"
          :elemChecked="index === 0 ? true : false"
        >
          {{ element }}
        </BaseRadio>
      </div>
    </BaseCard>
  </div>
  
  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">CarouselControl</h3>
      <div class="ui-kit__carousel-controls">
        <CarouselControl
          prev
        />
        <CarouselControl/>
      </div>
    </BaseCard>
  </div>
  
  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">BaseCard & Badges</h3>
      <div class="ui-kit__badges">
        <BadgeLabel class="ui-kit__label">
          Label
        </BadgeLabel>
        <div class="ui-kit__likes">
          <BadgeCounter
            :likes="cardLikes"
          />
          <BadgeLike
            @eventLike="cardLikes++"
          />
        </div>
      </div>
  </BaseCard>
  </div>

  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">BaseButton</h3>
      <div class="ui-kit__buttons">
        <BaseButton
          class="ui-kit__button"
        >
          Кнопка
        </BaseButton>
        <BaseButton
          disabled
          class="ui-kit__button"
        >
          Заблокирована
        </BaseButton>
        <BaseButton 
          loading
          class="ui-kit__button"
        >
          Кнопка
        </BaseButton>
      </div>
    </BaseCard>
  </div>
  
  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">BaseAvatar</h3>
      <div class="ui-kit__avatars">
        <BaseAvatar
          :size="'xs'"
          :name="'James Parker'"
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'xs'"
          :name="'Christopher Stewart'"
          online
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'sm'"
          :name="'David Fisher'"
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'sm'"
          :name="'Roger Clark'"
          :picture="'https://loremflickr.com/128/128'"
          online
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'md'"
          :name="'Tony Alexander'"
          :picture="'https://loremflickr.com/128/128'"
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'md'"
          :name="'Richard Aguilar'"
          online
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'lg'"
          :name="'Nicholas Russell'"
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'lg'"
          :name="'Sean Lee'"
          online
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'xl'"
          :name="'Alvin Ward'"
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'xl'"
          :name="'Carlos Bishop'"
          :picture="'https://loremflickr.com/128/128'"
          online
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'xxl'"
          :name="'Phil'"
          :picture="'https://loremflickr.com/128/128'"
          class="ui-kit__avatar-item"
        />
        <BaseAvatar
          :size="'xxl'"
          online
          class="ui-kit__avatar-item"
        />
      </div>
    </BaseCard>
  </div>
  
  <div class="ui-kit__grid-item">
    <BaseCard
      class="ui-kit__card"
    >
      <h3 class="ui-kit__header">BaseLogo</h3>
      <div class="ui-kit__logos">
        <BaseLogo/>
        <BaseLogo
          :size="'md'"
        />
        <BaseLogo
          :size="'lg'"
        />
        <BaseLogo
          :size="'xl'"
        />
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseLogo from '@/components/ui/BaseLogo/BaseLogo.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput/BaseInput.vue'
import FloatLabel from '@/components/ui/FloatLabel/FloatLabel.vue'
import BaseSelect from '@/components/ui/BaseSelect/BaseSelect.vue'
import BaseSwitch from '@/components/ui/BaseSwitch/BaseSwitch.vue'
import BaseRadio from '@/components/ui/BaseRadio/BaseRadio.vue'
import BaseAvatar from '@/components/ui/BaseAvatar/BaseAvatar.vue'
import CarouselControl from '@/components/ui/CarouselControl/CarouselControl.vue'
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import BadgeLike from '@/components/ui/BadgeLike/BadgeLike.vue'
import BadgeCounter from '@/components/ui/BadgeCounter/BadgeCounter.vue'
import BadgeLabel from '@/components/ui/BadgeLabel/BadgeLabel.vue'
import pageLoading from '@/mixins/pageLoading.js'

export default {
  name: 'UIKit',

  components: {
    BaseLogo,
    BaseButton,
    BaseInput,
    FloatLabel,
    BaseSelect,
    BaseSwitch,
    BaseRadio,
    BaseAvatar,
    CarouselControl,
    BaseCard,
    BadgeLike,
    BadgeCounter,
    BadgeLabel
  },

  mixins: [
    pageLoading
  ],

  data() {
    return {
      baseInput1: '',
      baseInput2: '',
      baseInput3: '',
      baseSelect1: '',
      baseSelect2: '',
      selectData1: [
        {name: 'Пункт первый', disabled: false},
        {name: 'Пункт второй', disabled: true},
        {name: 'Пункт третий', disabled: false},
        {name: 'Пункт четвертый', disabled: false},
        {name: 'Пункт пятый', disabled: false},
        {name: 'Пункт шестой', disabled: false},
        {name: 'Пункт седьмой', disabled: false},
        {name: 'Пункт восьмой', disabled: false},
      ],
      selectData2: [
        {name: 'Пункт первый', disabled: false},
        {name: 'Пункт второй', disabled: true},
        {name: 'Пункт третий', disabled: false},
        {name: 'Пункт четвертый', disabled: false},
      ],
      baseSwitch: {
        0: '',
        1: '',
        2: ''
      },
      switchData: [
        'switch1',
        'switch2',
        'switch3_disabled'
      ],
      baseRadio: '',
      radioData: [
        'первый',
        'второй',
        'третий'
      ],
      cardLikes: 21
    }
  }
}
</script>

<style lang="scss" src="./UIKit.scss"/>