export default {
  emits: [
    'showLoader'
  ],
  
  beforeMount() {
    this.showPageLoader(1500)
  },

  methods: {
    showPageLoader(duration) {
      this.$emit('showLoader', true)
      document.body.classList.add('body_loading')
      setTimeout(() => {
        this.$emit('showLoader', false)
        document.body.classList.remove('body_loading')
      }, duration)
    }
  }
}