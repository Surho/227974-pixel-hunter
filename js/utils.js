
const utils = {

  /**
   * основной контейнер, использующийся в каждлом модуле
   */
  main: document.querySelector(`#main`),
  gameScreens: [],

  /**
   * рендерит конкретный экран element в основной контейнет
   * записанный выше
   * @param {str} str - строка html
   * @return {element} element - dom element
   */
  getElementFromTemplate(str) {
    let element = document.createElement(`div`);

    element.innerHTML = str;

    return element;
  },

  /**
   * рендерит конкретный экран
   * @param {node} element - контент экрана
   */
  render(element) {
    this.main.innerHTML = ``;
    this.main.appendChild(element);
  },

/**
 * думаю как отчистить все выборы, пока без этого
 */
  // clear(screens) {
  //   for( let i = 0; i < gameScreens.length; i++) {
  //     if(gameScreens[i].querySelector('input')) {

  //     }
  //   }
  // }
};

export default utils;
