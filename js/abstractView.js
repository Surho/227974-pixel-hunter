export default class AbstractView {
  constructor() {
    if( new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if(this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    const element = document.createElement(`template`);
    element.innerHTML = this.template;
    return element.content;
  }

  show(...elements)  {
    main.innerHTML = ``;
    elements.forEach((element) => {
      main.appendChild(element);
    });
  };

  bind() {
    //add if needed
  }
}
