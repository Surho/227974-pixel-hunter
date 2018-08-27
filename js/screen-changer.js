import {header} from './header.js';
import {statsLine} from './statsLine.js';
import {gameScreen} from './gameScreen.js';
import {render} from './utils.js';
import stats from './stats.js';

export const screenChanger = (state, questions) => {
  console.log(state);
  console.log(state.question, questions.length);

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

