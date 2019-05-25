/*Создаем массивы из букв и цыфр*/
const letters = ['A','B','C','D','E','F','G','H'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const search = document.getElementById('search');

/*Проверка текщей точки через регулярное выражение*/
const checkCurrentPoint = (point) => {
  if (point.match('^[a-hA-H][0-8]$') === null) {
    return false;
  }
  return true;
}

/*Проверка точки на существование после хода*/
const checkLetAndNum = (let, num) => {
  if (let == undefined || num == undefined) {
    return false;
  }
  return true;
}

/*Добавление точки в конечный массив*/
const addPointToArr = (position, result) => {
  if (position == null) {
    return false;
  }
  result.push(position);
}

/*Функция определения всех возможных точек хода*/
const determineAllPos = (indexLetter, indexNumber) => {
  const allMovePoint = [-1, +1, -2, +2]; //Массив из 4 вариантов движений
  const result = [];
  let newPosition = '';
  /*Далее перебераем цыкл сам с собой, чтобы получить все варианты хода*/
  for (let i = 0; i < allMovePoint.length; i++) {
    for (let j = 0; j < allMovePoint.length; j++) {
      //Сравниваем модули чисел чтобы отсеить варианты типа: (+1,-1);(+2,-2)...
      if (Math.abs(allMovePoint[i]) != Math.abs(allMovePoint[j])) {
        const letter = letters[indexLetter + allMovePoint[i]];
        const number = numbers[indexNumber + allMovePoint[j]];
        if (checkLetAndNum(letter, number)) {
          newPosition = letter + number;
        } else {
          newPosition = null;
        }
        addPointToArr(newPosition, result);
      }
    }
  }
  return result;
}

/*Возвращаем список возможных ходов при клике*/
search.onclick = function() {
  let position = document.getElementById('position');
  if (!checkCurrentPoint(position.value)) {
    return alert('Данные не введены или введены не корректно!');
  }
  let indexLetter = letters.indexOf(position.value[0].toUpperCase());
  let indexNumber = numbers.indexOf(Number(position.value[1]));
  let result = determineAllPos(indexLetter, indexNumber);
  alert('Возможные варианты хода\n\n\n' + result.join(' '));
};
