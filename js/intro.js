import {getElementFromTemplate, render} from './utils.js';
import greeting from './greeting.js';

console.log(getElementFromTemplate);
const template = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;
/**
 * @param {element} screen - передаем #documentFragment экрана
 * и ищем в нем нужные нам элементы и вешаем на них обработчики.
 * Далее везде аналогично.
 */

function onClick() {
  render(greeting());
}

const initScreen = (screen) => {
  const buttonNext = screen.querySelector(`.intro__asterisk`);

  buttonNext.addEventListener(`click`, onClick);
};

/**
 * генерируем свежий #documentFragment
 * и инициализируем все обработчики
 * @return {node} elem - готовый экран со всеми обработчиками
 * Далее везде аналогично.
 */

const intro = () => {
  const elem = getElementFromTemplate(template);
  initScreen(elem);
  return elem;
};

export default intro;
