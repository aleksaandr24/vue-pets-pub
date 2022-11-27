import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'loading',
    component: () => import('@/views/LaunchScreen/LaunchScreen.vue'),
    meta: {
      layout: 'only-main'
    }
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('@/views/StartScreen/StartScreen.vue'),
    meta: {
      layout: 'only-main'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginScreen/LoginScreen.vue'),
    meta: {
      layout: 'only-main'
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/RegistrationScreen/RegistrationScreen.vue'),
    meta: {
      layout: 'only-main'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeScreen/HomeScreen.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/pets',
    name: 'pets',
    component: () => import('@/views/PetsScreen/PetsScreen.vue'),
    meta: {
      title: 'Питомцы'
    }
  },
  {
    path: '/pets/:id',
    name: 'pets-detailed',
    component: () => import('@/views/PetsScreenDetailed/PetsScreenDetailed.vue'),
    meta: {
      title: 'Питомцы\\'
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogScreen/BlogScreen.vue'),
    meta: {
      title: 'Новости'
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/ChatScreen/ChatScreen.vue'),
    meta: {
      title: 'Чат'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileScreen/ProfileScreen.vue'),
    meta: {
      title: 'Профиль'
    }
  },
  {
    path: '/ui-kit',
    name: 'UIKit',
    component: () => import('@/views/UIKit/UIKit.vue'),
    meta: {
      title: 'UI-kit'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: () => import('@/views/404Screen/404Screen.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router