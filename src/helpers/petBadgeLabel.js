export default (groupID, ageStr, sexType) => {
  const labels = {
    1: ['Щенок', 'Пёс', 'Собака'],
    2: ['Котенок', 'Кот', 'Кошка'],
    3: ['Птенец', 'Птица', 'Птичка'],
    4: ['Зайчонок', 'Заяц', 'Зайчиха'],
    5: ['Мышонок', 'Мышь', 'Мышка'],
    6: ['Зверёнок', 'Зверь', 'Зверушка']
  }
  const nowDate = new Date()
  const dateOfBirth = new Date(ageStr)
  dateOfBirth.setFullYear(dateOfBirth.getFullYear() + 1)
  
  return dateOfBirth > nowDate 
        ? labels[groupID][0]
        : labels[groupID][sexType ? 1 : 2]
}