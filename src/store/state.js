const state = {
  appTheme: 'light',

  screenWidth: 0,

  screenHeight: 0,

  screenType: 'desktop',

  userAuth: false,

  userUID: null,

  userName: '',

  userGoals: [
    {id: 0, name: 'Прогулка в парке', status: 'cancel'},
    {id: 1, name: 'Обед', status: 'complete'},
    {id: 2, name: 'Перекус 1/2', status: 'half-complete'},
    {id: 3, name: 'Игры', status: 'in-progress'},
  ],

  postsAPI: 'https://aleksaandr24.github.io/data-temp/posts.json',

  posts: [],

  petsAPI: 'https://aleksaandr24.github.io/data-temp/animals.json',

  pets: {},

  userPetsAPI: 'https://aleksaandr24.github.io/data-temp/statistic.json',

  userPets: [],

  petsCategories: [],

  petsCategoriesAPI: 'https://aleksaandr24.github.io/data-temp/groups.json'
}

export default state