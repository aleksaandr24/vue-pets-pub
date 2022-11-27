import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout.vue'
import OnlyMain from '@/layouts/OnlyMain/OnlyMain.vue'
import MasonryWall from '@yeger/vue-masonry-wall'
import '@/assets/styles/main.scss'

createApp(App)
  .component('default-layout', DefaultLayout)
  .component('only-main', OnlyMain)
  .use(store)
  .use(router)
  .use(MasonryWall)
  .mount('#app')