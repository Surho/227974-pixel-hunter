
export function calculatePoints(answersArr, lifes) {
  let sumPoints = 0;
  let incorrectAnswers = 0;

  for (let i = 0; i < answersArr.length; i++) {

    if (answersArr[i].isCorrect) {
      sumPoints += 100;
    } else {
      incorrectAnswers += 1;
    }

    if (answersArr[i].time <= 10) {
      sumPoints += 50;
    }

    if (answersArr[i].time >= 20) {
      sumPoints -= 50;
    }

    if (incorrectAnswers === 3) {
      sumPoints = -1;
      return sumPoints;
    }

  }

  sumPoints += (lifes * 50);

  return sumPoints;
}
