const mutations = {
  setAppTheme(state, theme) {
    state.appTheme = theme
  },

  setScreenWidth(state, width) {
    state.screenWidth = width
  },

  setScreenHeight(state, height) {
    state.screenHeight = height
  },

  setScreenType(state, type) {
    state.screenType = type
  },

  setUserAuth(state, auth) {
    state.userAuth = auth
  },

  setUserName(state, name) {
    state.userName = name
  },

  setUserUID(state, uid) {
    state.userUID = uid
  },

  setUserGoal(state, goalItem) {
    const currentGoalItem = state.userGoals.find(item => item.id === goalItem.id)
    const goalIndex = state.userGoals.indexOf(currentGoalItem)
    state.userGoals.splice(goalIndex, 1, goalItem)
  },

  setPosts(state, postsData) {
    state.posts = postsData
  },

  setPets(state, petsData) {
    state.pets = petsData
    for (const item in state.pets) {
      state.pets[item].likedByUser = false
    }
  },

  setPetLikes(state, {petID, increment}) {
    const statePet = state.pets[petID]
    statePet.likedByUser = !statePet.likedByUser
    statePet.likes += increment
  },

  setUserPets(state, userPetsData) {
    state.userPets = userPetsData
  },

  setPetsCategories(state, categData) {
    state.petsCategories = categData
  }
}

export default mutations