import utils from './utils.js';
import greeting from './greeting.js';

const template = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;
const intro = utils.getElementFromTemplate(template);
const buttonNext = intro.querySelector(`.intro__asterisk`);

intro.addEventListener(`click`, (evt) => {
  if (evt.target === buttonNext) {
    utils.render(greeting);
  }
});

utils.gameScreens.push(intro);

export default intro;
