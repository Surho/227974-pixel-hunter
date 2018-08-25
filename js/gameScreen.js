import {getElementFromTemplate, render, initButtonBack} from './utils.js';
import game2 from './game-2.js';
import {gameState} from './data/data.js';
import {questions} from './data/data.js';

export const gameScreen = (question) => {
  let template;
  if (question.type === `triple`) {
    template = `
    <div class="game__option">
      <img src="${question.answers[0].picSrc}" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="${question.answers[1].picSrc}" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="${question.answers[2].picSrc}" alt="Option 3" width="304" height="455">
    </div>`;
  } else {
    template =
    question.answers.slice().map((answer) => {
      return `<div class="game__option">
      <img src="${answer.picSrc}" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;
    }).join(``);
  }

  return `
  <section class="game">
    <p class="game__task">${question.taskText}</p>
    <form class="game__content game-content--${question.type}">
      ${template}
    </form>
  </section>`;
};


/**
 * @param {node} screen -#docuemntFragment
 * если был change как в поле [name="question1"] так и в
 * [name="question2"], то рендер
 */

const initScreen = (screen) => {
  const gameForm = screen.querySelector(`.game__content`);

  initButtonBack(screen);

  let gameChoice1 = null;
  let gameChoice2 = null;
  gameForm.addEventListener(`change`, (evt) => {
    let target = evt.target;
    if (target.name === `question1`) {
      gameChoice1 = true;
    }
    if (target.name === `question2`) {
      gameChoice2 = true;
    }
    if (gameChoice1 && gameChoice2) {
      render(game2());
    }
  });
};

console.log(getElementFromTemplate);

const game = () => {
  const elem = getElementFromTemplate(gameScreen(questions[0]));
  initScreen(elem);
  return elem;
};

export default game;
