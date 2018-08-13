
import utils from './utils.js';
import intro from './intro.js';
import greeting from './greeting.js';

utils.render(intro);

utils.main.addEventListener(`click`, (evt) => {
  let target = evt.target;

  if (target.closest(`.back`)) {
    utils.render(greeting);
  }
});
