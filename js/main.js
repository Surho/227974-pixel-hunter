
import {render} from './utils.js';
import intro from './intro.js';

// import greeting from './greeting.js';

const main = document.querySelector(`#main`);

render(intro, main);

// utils.main.addEventListener(`click`, (evt) => {
//   let target = evt.target;

//   if (target.closest(`.back`)) {
//     render(greeting);
//   }
// });
