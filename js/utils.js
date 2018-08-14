
  /**
   * рендерит конкретный экран element в основной контейнет
   * записанный выше
   * @param {str} str - строка html
   * @return {template} template - dom element из строки
   */
    export const getElementFromTemplate = (str) => {
      let element = document.createElement(`template`);

      element.innerHTML = str;

      return element;
    }

  /**
   * рендерит конкретный экран
   * @param {node} element - контент экрана
   * @param {node} container - куда рендерить
   */

    export const render = (element, container) => {
      container.innerHTML = ``;
      container.appendChild(element.content);
    }




