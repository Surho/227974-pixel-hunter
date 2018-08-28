import {header} from './header.js';
import {statsLine} from './statsLine.js';
import {gameScreen} from './gameScreen.js';
import {render} from './utils.js';
import stats from './stats.js';

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

  if(state.question >= questions.length) {
    state.result = 'Победа!';
    render(stats());
    return;
  }

  if(state.lives === 0) {
    state.result = 'Fail';
    render(stats());
    return;
  }

  render(header(state), gameScreen(questions[state.question]), statsLine(state));
}

