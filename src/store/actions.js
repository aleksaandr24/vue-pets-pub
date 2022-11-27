const actions = {
  changeAppTheme({ commit }, theme) {
    commit('setAppTheme', theme)
  },

  changeScreenWidth({ commit }, width) {
    commit('setScreenWidth', width)
  },

  changeScreenHeight({ commit }, heiht) {
    commit('setScreenHeight', heiht)
  },

  changeScreenType({ commit, state }) {
    let screenType
    const screenBreakpoints = [
      {type: 'mobile', min: 0, max: 768},
      {type: 'tablet', min: 768, max: 1280},
      {type: 'laptop', min: 1280, max: 1920},
      {type: 'desktop', min: 1920, max: Infinity}
    ]
    screenBreakpoints.forEach(item => {
      if ((state.screenWidth >= item.min) && (state.screenWidth < item.max)) {
        screenType = item.type
      }
    })
    commit('setScreenType', screenType)
  },

  changeUserAuth({ commit }, payload) {
    commit('setUserAuth', payload.auth)
    commit('setUserUID', payload.uid)
  },

  changeUserName({ commit }, name) {
    commit('setUserName', name)
  },

  changeUserGoal({ commit }, goalItem) {
    commit('setUserGoal', goalItem)
  },

  async downloadPosts({ commit, state }) {
    try {
      const response = await fetch(state.postsAPI)
      const posts = await response.json()
      commit('setPosts', posts)
    } catch(e) {
      console.error(e)
    }
  },

  async downloadPets({ commit, state }) {
    try {
      const response = await fetch(state.petsAPI)
      const pets = await response.json()
      commit('setPets', pets)
    } catch(e) {
      console.error(e)
    }
  },

  changePetLikes({ commit }, payload) {
    const petID = payload.petID
    const increment = payload.increment ? 1 : -1
    commit('setPetLikes', {petID, increment})
  },

  async downloadUserPets({ commit, state }) {
    try {
      const response = await fetch(state.userPetsAPI)
      const userPets = await response.json()
      commit('setUserPets', userPets)
    } catch(e) {
      console.error(e)
    }
  },

  async downloadPetsCategories({ commit, state }) {
    try {
      const response = await fetch(state.petsCategoriesAPI)
      const petsCategories = await response.json()
      commit('setPetsCategories', petsCategories)
    } catch(e) {
      console.error(e)
    }
  }
}

export default actions