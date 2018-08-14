import {getElementFromTemplate, render} from './utils.js';
import greeting from './greeting.js';



const template = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;
const intro = getElementFromTemplate(template);
const buttonNext = intro.content.querySelector(`.intro__asterisk`);
const main = document.querySelector(`#main`);
console.log(buttonNext);


buttonNext.addEventListener(`click`, () => {
    render(greeting, main);
});

export default intro;
