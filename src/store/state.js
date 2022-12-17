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

  postsAPI: 'https://yvladandmir.github.io/dataForPets/posts.json',

  posts: [],

  petsAPI: 'https://yvladandmir.github.io/dataForPets/animals.json',

  pets: {},

  userPetsAPI: 'https://yvladandmir.github.io/dataForPets/statistic.json',

  userPets: [],

  petsCategories: [],

  petsCategoriesAPI: 'https://yvladandmir.github.io/dataForPets/groups.json'
}

export default state