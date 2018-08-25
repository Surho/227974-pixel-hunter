export const statsLineTemplate = (state) => {
  return `
  <ul class="stats">
  ${updateGameStats(state)}
  </ul>`;
};

const updateGameStats = (state) => {
  let stats = ``;
  state.answers.forEach((answer) => {
    if (answer.isCorrect === false) {
      stats += `<li class="stats__result stats__result--wrong"></li>\n`;
      return;
    }
    if (answer.isCorrect === null) {
      stats += `<li class="stats__result stats__result--unknown"></li>\n`;
      return;
    }
    if (answer.time < 10) {
      stats += `<li class="stats__result stats__result--fast"></li>\n`;
      return;
    }
    if (answer.time > 20) {
      stats += `<li class="stats__result stats__result--slow"></li>\n`;
      return;
    }
    stats += `<li class="stats__result stats__result--correct"></li>\n`;
  });
  return stats;
};
