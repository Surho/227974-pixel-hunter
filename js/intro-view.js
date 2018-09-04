import AbstractView from "./abstractView";

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`;
  }

  onNextClick() {
  }

  bind() {
    const buttonNext = this.element.children[0].querySelector(`.intro__asterisk`);

    buttonNext.addEventListener(`click`, () => {
      this.onNextClick();
    });
  }
}
