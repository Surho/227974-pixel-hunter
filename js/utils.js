
const utils = {

  main: document.querySelector(`#main`),

  getElementFromTemplate: function(str) {
    let element = document.createElement('div');

    element.innerHTML = str;

    return element
  },

  /**
   * рендерит конкретный экран element в блок block
   * @param {node} element - контент экрана
   */
  render(element) {
    this.main.innerHTML = ``;
    this.main.appendChild(element)  ;
  },
}

export default utils;
