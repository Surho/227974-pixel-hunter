import AbstractView from "./abstract-view.js";

const TYPE_1PICTURE = `wide`;
const TYPE_2PICTURE = ``;
const TYPE_3PICTURE = `triple`;

export default class GameView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    let template;
    switch (this.question.type) {
      case TYPE_3PICTURE:
        template = this._template3(this.question);
        break;
      case TYPE_1PICTURE:
        template = this._template1(this.question);
        break;
      default:
        template = this._template2(this.question);
    }
    return `<section class="game">
                <p class="game__task">${this.question.taskText}</p>
                <form class="game__content game__content--${this.question.type}">
                  ${template}
                </form>
              </section>`;
  }

  _template3(question) {
    return `<div class="game__option" data-value=${question.answers[0].value}>
      <img src="${question.answers[0].picSrc}" alt="Option 1">
    </div>
    <div class="game__option" data-value=${question.answers[1].value}>
      <img src="${question.answers[1].picSrc}" alt="Option 2">
    </div>
    <div class="game__option" data-value=${question.answers[2].value}>
      <img src="${question.answers[2].picSrc}" alt="Option 3">
    </div>`;
  }

  _template2(question) {
    return question.answers.map((answer, i) => {
      return `<div class="game__option">
      <img src="${answer.picSrc}" alt="Option 1">
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

  _template1(question) {
    return `<div class="game__option">
        <img src="${question.answers[0].picSrc}" alt="Option 1">
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

  onChangeType1() {}
  onChangeType2() {}
  onClick() {}

  bind() {
    const screen = this.element.querySelector(`.game__content`);

    if (this.question.type === TYPE_1PICTURE) {
      screen.addEventListener(`change`, (evt) => {
        this.onChangeType1(evt.target.value);
      });
    }

    if (this.question.type === TYPE_2PICTURE) {
      screen.addEventListener(`change`, (evt) => {
        this.onChangeType2(evt.target.value, evt.target.name);
      });
    }

    if (this.question.type === TYPE_3PICTURE) {
      screen.addEventListener(`click`, (evt) => {
        let target = evt.target;
        while(!target.dataset.value) {
          target = target.parentElement;
        }
        this.onClick(target.dataset.value);
      });
    }
  }
}
