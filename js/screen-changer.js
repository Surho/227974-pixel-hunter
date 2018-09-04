import Header from './header.js';
import GameScreen from './gameScreen.js';
import StatsLine from './statsLine.js';
import {resizePicsOnScreen} from './resize.js';
import {countFinalStatistics} from './utils.js';
import Stats from './stats.js';


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
const main = document.querySelector(`#main`);

export const screenChanger = (state, questions) => {
  let statistics;

  if (state.question >= questions.length) {
    statistics = countFinalStatistics(state, `Победа`);
    main.innerHTML = ``;
    main.appendChild(new Header(false, state).header.element);
    main.appendChild(new Stats(statistics, state).stats.element);
    return;
  }

  if (state.lives === 0) {
    statistics = countFinalStatistics(state, `Fail`);
    main.innerHTML = ``;
    main.appendChild(new Header(false, state).header.element);
    main.appendChild(new Stats(statistics, state).stats.element);
    return;
  }

  const header = new Header(true, state).header.element;
  const gameScreen = new GameScreen(questions[state.question]).gameScreen.element;
  const statsLine = new StatsLine(state).statsLine.element;

  main.innerHTML = ``;
  main.appendChild(header);
  resizePicsOnScreen(gameScreen);
  main.appendChild(gameScreen);
  main.appendChild(statsLine);
};
