import {getElementFromTemplate, render, initButtonBack} from './utils.js';
import greeting from './greeting.js';
import {questions, gameState} from './data/data.js';
import {screenChanger} from './screen-changer.js';
import {headerTemplate} from './header.js'


const template = `
  ${headerTemplate}
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`;

function onClick() {
  screenChanger(gameState, questions);
}

const initScreen = (screen) => {
  const rulesForm = screen.querySelector(`.rules__input`);
  const buttonNext = screen.querySelector(`.rules__button`);

  rulesForm.addEventListener(`keyup`, () => {
    buttonNext.disabled = !rulesForm.value;
  });

  buttonNext.addEventListener(`click`, onClick);

  initButtonBack(screen, greeting);
};

const rules = () => {
  const elem = getElementFromTemplate(template);
  initScreen(elem);
  return elem;
};

export default rules;
