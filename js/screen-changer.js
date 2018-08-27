import {header} from './header.js';
import {statsLine} from './statsLine.js';
import {gameScreen} from './gameScreen.js';
import {questions} from './data/data.js';
import {render} from './utils.js';
import stats from './stats.js';

const main = document.querySelector(`#main`);

export const screenChanger = (state, questions) => {
  console.log(state);
  console.log(state.question, questions.length);
  if(state.question >= questions.length) {
    render(stats());
    return;
  }
  if(state.lives === 0) {
    render(stats());
    return;
  }
  main.innerHTML = '';
  main.appendChild(header(state));
  main.appendChild(gameScreen(questions[state.question]));
  main.appendChild(statsLine(state));
}

