'use strict';

const LEFT_ARROW_CODE = 37;
const RIGHT_ARROW_CODE = 39;
const ARROWS_HTML = `
  <div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn" data-direction="left"><-</button>
    <button class="arrows__btn" data-direction="right">-></button>
  </div>
`;

const main = document.querySelector(`#main`);
/**
 * Собираем все templates и далее
 * в массиве достаем .content для каждого
 */
const screens = Array.from(document.querySelectorAll(`template`))
.map((screen) => screen.content);

/**
 * рендерит конкретный экран в блок #main
 * @param {node} element - контент экрана
 */
function renderScreen(element) {
  main.innerHTML = ``;
  main.appendChild(element.cloneNode(true));
}

/**
 * использует renderScreen для рендера по номеру
 * @param {number} index - номер экрана
 */
let current = 1;
function selectScreen(index) {
  index = index < 0 ? index = screens.length : index;
  index = index > screens.length - 1 ? index = 0 : index;

  current = index;
  renderScreen(screens[current]);
}

/** рендерим первый экран */
renderScreen(screens[current]);

/** вставка стелочек */
document.body.insertAdjacentHTML(`beforeend`, ARROWS_HTML);

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW_CODE:
      selectScreen(current + 1);
      break;
    case LEFT_ARROW_CODE:
      selectScreen(current - 1);
      break;
  }
});

/**
 * обрабатываем клики на документе,
 * если event.target, ближайштй содержащий нужный класс
 * и dataset , переключаем экран
 */
document.addEventListener(`click`, (evt) => {

  let target = evt.target;

  if (target.closest(`.arrows__btn`) || target.dataset.direction) {
    if (target.dataset.direction === `left`) {
      selectScreen(current - 1);
      return;
    }
    selectScreen(current + 1);
  }
});
