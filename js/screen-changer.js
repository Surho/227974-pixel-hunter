
import {GameScreen} from './screen/GameScreen.js';
import {statsLine} from './screen/statsLine.js';
import {stats} from './screen/stats.js';
import {countFinalStatistics, render} from './utils.js';

/**
 * @param {object} state - состояние на данный момент
 * @param {array} questions - список вопросов
 * Если игрок дошел по ответам до края questions, то
 * это победа, либо кончились жизни -поражение и попадаем
 * на экран статистики.
 *
 * Пока не достигнуты крайние случаи , при вызове screenChenger
 * рендерит соотвествено :
 * header - в зависимости от состояния игры
 * gameScreen - основной экран игры по номеру текущего вопроса
 * statsLine - линию наших ответов , в зависимости от
 * текущего состоягия игры
 *
 */

export const screenChanger = (state, questions) => {
  let finalState;

  if (state.question >= questions.length) {
    finalState = `Победа`;
  }

  if (state.lives === 0) {
    finalState = `Fail`;
  }

  if (finalState) {
    // const statistics = countFinalStatistics(state, finalState);
    // render(header(state, false), stats(statistics, state));
    // return;
  }

  // render(header(state, true), game(questions[state.question]), statsLine(state));
};
