const getters = {
  getAppTheme: state => {
    return state.appTheme
  },

  getScreenWidth: state => {
    return state.screenWidth
  },

  getScreenHeight: state => {
    return state.screenHeight
  },

  getScreenType: state => {
    return state.screenType
  },

  getUserAuth: state => {
    return state.userAuth
  },

  getUserUID: state => {
    return state.userUID
  },

  getUserName: state => {
    return state.userName
  },

  getUserGoals: state => {
    return state.userGoals
  },

  getPosts: state => {
    return state.posts
  },

  getPets: state => {
    return state.pets
  },

  getUserPets: state => {
    return state.userPets
  },

  getPetsCategories: state => {
    return state.petsCategories
  }
}

export default getters