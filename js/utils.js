import greeting from './greeting.js';

const main = document.querySelector(`#main`);

/**
 * рендерит конкретный экран element в основной контейнет
 * записанный выше
 * @param {str} str - строка html
 * @return {node} element.content - #documentFragment из строки
 */
export const getElementFromTemplate = (str) => {
  const element = document.createElement(`template`);

  element.innerHTML = str;

  return element.content;
};

/**
 * рендерит конкретный экран
 * @param {node} element - контент экрана, генерируется из
 * функций каждого модуля
 * @param {node} container - куда рендерить
 */

export const render = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export const initButtonBack = (screen) => {
  const buttonBack = screen.querySelector(`.back`);
  buttonBack.addEventListener(`click`, () => {
    render(greeting());
  });
};
