import {getElementFromTemplate, answersCheck} from './utils.js';
import {gameState} from './data/data.js';
import {questions} from './data/data.js';
import {screenChanger} from './screen-changer.js';



export const gameScreen = (question) => {
  let content;
  switch (question.type) {
    case 'triple':
    content = createTemplate3(question);
    break;
    case 'wide':
    content = createTemplate1(question);
    break;
    default:
    content = createTemplate2(question);
    break;
  }

  let screenTemplate = (question) => {
    return  `<section class="game">
        <p class="game__task">${question.taskText}</p>
        <form class="game__content game__content--${question.type}">
          ${content}
        </form>
      </section>`;
  }


  let gameScreen = getElementFromTemplate(screenTemplate(question));

  initScreen(question.type, gameScreen);

  return gameScreen;

};


function createTemplate3(question) {
    return `<div class="game__option">
      <img src="${question.answers[0].picSrc}" data-value=${question.answers[0].value} alt="Option 1"  height="455">
    </div>
    <div class="game__option">
      <img src="${question.answers[1].picSrc}" data-value=${question.answers[1].value} alt="Option 2"  height="455">
    </div>
    <div class="game__option">
      <img src="${question.answers[2].picSrc}" data-value=${question.answers[2].value} alt="Option 3"  height="455">
    </div>`;
}

function createTemplate2(question) {
 return question.answers.slice().map((answer, i) => {
    return `<div class="game__option">
    <img src="${answer.picSrc}" alt="Option 1" height="455">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question${i}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question${i}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;
  }).join(``);
}

function createTemplate1(question) {
  return `<div class="game__option">
      <img src="${question.answers[0].picSrc}" alt="Option 1" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;
}

/**
 * @param {node} screen -#docuemntFragment
 * если был change как в поле [name="question1"] так и в
 * [name="question2"], то рендер
 */

const initScreen = (type, screen) => {
  const gameContent = screen.querySelector(`.game__content`);


  if(type === 'wide') {
    gameContent.addEventListener(`change`, (evt) => {
      let target = evt.target;

      let isCorrect = answersCheck(gameState, target.value);

      gameState.question += 1
      gameState.answers.push({time: 15, answers: target.value, isCorrect});

      screenChanger(gameState, questions);
    })
  }

  if(type === '') {
    let gameChoice0 = null;
    let gameChoice1 = null;
    gameContent.addEventListener(`change`, (evt) => {
      let target = evt.target;
      if (target.name === `question0`) {
        gameChoice0 = target.value;
      }
      if (target.name === `question1`) {
        gameChoice1 = target.value;
      }
      if (gameChoice0 && gameChoice1) {

        let isCorrect = answersCheck(gameState, gameChoice0, gameChoice1);

        gameState.question += 1;
        gameState.answers.push({time: 15, answers: [gameChoice0, gameChoice1], isCorrect});

        screenChanger(gameState, questions);
      }
    })
  }

  if(type === 'triple') {
    gameContent.addEventListener(`click`, (evt) => {
      let target = evt.target;

      let isCorrect = answersCheck(gameState, target.dataset.value);

      gameState.question += 1;
      gameState.answers.push({time: 15, answers: target.dataset.value}, isCorrect);

      screenChanger(gameState, questions);

    })
  }
}





