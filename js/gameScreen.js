import {getElementFromTemplate, answersCheck} from './utils.js';
import {gameState} from './data/data.js';
import {questions} from './data/data.js';
import {screenChanger} from './screen-changer.js';


/**
 * @param {object} question - вопрос из data.js
 * в зависимости от типа вопроса , генерируется
 * разметка под соотвествующее кол-во варивнтов ответа.
 * @return {node} screen - DOM элемент контента игры
 * с навешанными обработчиками, в зависимости от типа вопросов.
 *
 * Стили формы под разный тип вопросов берутся из класса
 * .game__content--${question.type}.
 * Где game__content--wide - 1 картинка
 *     game__content без модификатора - 2 картинки
 *     game__content--triple - 3 картинки
 */
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

  let screen = getElementFromTemplate(screenTemplate(question));

  initScreen(question.type, screen, gameState);

  return screen;
};

/**
 * @param {object} question - вопрос взятый из
 * data.js
 * @return {string} возвращает разметку соотвественно
 * для варианта с тремя картинками, двумя и одной.
 *
 * От себя добавил к варианту с тремя картинками дата-атрибут
 * data-value = paint/photo; (иначе не знаю как отличить кто есть кто)
 */
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
 *
 * @param {string} type - тип вопросов в игре (wide - 1 картинка ,
 * triple - 3 картинки, `` - 2 картинки )
 * @param {node} screen - экран на который вешаем обработчики,
 * в нашем случае на gameScreen , в зависимости от его типа.
 * @param {object} state - текущее состояние игры (gameState)
 *
 * В каждом обработчике проверям корректность выбора функцией
 * @function answersCheck(./utils.js), которая в случае ошибки минусует жизнь
 * в нашем @name gameState. Меняем @name gameState , изменяем номер текущего вопроса,
 * записываем туда ответ игрока (время, ответ, корректность)
 * и передаем управление @function screenChanger
 */
const initScreen = (type, screen, state) => {
  const gameContent = screen.querySelector(`.game__content`);

  if(type === 'wide') {
    gameContent.addEventListener(`change`, (evt) => {
      let target = evt.target;

      let isCorrect = answersCheck(state, target.value);

      state.question += 1
      state.answers.push({time: 15, answers: target.value, isCorrect});

      screenChanger(state, questions);
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

        let isCorrect = answersCheck(state, gameChoice0, gameChoice1);

        state.question += 1;
        state.answers.push({time: 15, answers: [gameChoice0, gameChoice1], isCorrect});
        screenChanger(state, questions);
      }
    })
  }

  if(type === 'triple') {
    gameContent.addEventListener(`click`, (evt) => {
      let target = evt.target;

      let isCorrect = answersCheck(state, target.dataset.value);

      state.question += 1;
      state.answers.push({time: 15, answers: target.dataset.value, isCorrect});

      screenChanger(state, questions);

    })
  }
}





