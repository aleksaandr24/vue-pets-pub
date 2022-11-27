<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="iconProps.width[screenType]"
    :height="iconProps.height[screenType]"
    :viewBox="`0 0 ${iconProps.width['desktop']} ${iconProps.height['desktop']}`"
    :fill="iconProps.fill[appTheme]"
    :stroke="iconProps.stroke[appTheme]"
  >
    <slot/>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IconBase',

  props: {
    iconProps: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      screenType: 'getScreenType',
      appTheme: 'getAppTheme'
    })
  }
}
</script>