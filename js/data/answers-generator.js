
function Answer (level, isCorrect, time) {
  this.level = level;
  this.isCorrect = isCorrect;
  this.time = time
};

/**
 * @param {Number} correctNum - кол-во правильных ответов
 * @param {Obj} obj - обьект с данными о кол-ве быстрых , нормальных
 * и медленных ответов
 * @return {Array} answersArray - массив обьектов ответов
 */
export function genereteAnswers(correctNum, {fast: fast, normal: normal, slow: slow}) {
  const asnwersArray = [];
  const speedAnswers = {fast: fast, normal: normal, slow: slow};
  for (let i = 0; i < 10; i++) {

    let correct;
    correct = correctNum > 0 ? true : false
    --correctNum

    let time;
    if(speedAnswers.fast > 0) {
      time = 5;
      --speedAnswers.fast
    } else if (speedAnswers.normal > 0) {
      time = 15;
      --speedAnswers.normal
    } else if (speedAnswers.slow > 0) {
      time = 25;
      --speedAnswers.slow
    }

    asnwersArray.push(new Answer(i, correct, time));
  }

  return asnwersArray;
}
