const preprocessType = (question) => {
  switch (question.type) {
    case `tinder-like`:
      return `wide`;
    case `two-of-two`:
      return `double`;
    case `one-of-three`:
      return `triple`;
  }
  return false;
};

const preprocessAnswers = (question) => {
  const preprocessedAnswers = [];
  for (const answer of question.answers) {
    preprocessedAnswers.push({
      picSrc: answer.image.url,
      value: (answer.type === `painting`) ? answer.type.slice(0, 5) : answer.type,
      width: answer.image.width,
      height: answer.image.height
    });
  }
  return preprocessedAnswers;
};

export const adaptServerData = (data) => {
  const adaptedData = [];
  for (const question of data) {
    adaptedData.push({
      type: preprocessType(question),
      taskText: question.question,
      answers: preprocessAnswers(question)
    });
  }
  return adaptedData;
};
