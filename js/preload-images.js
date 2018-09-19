import {resize} from './resize.js';

const frameSizes = {
  'wide': {width: 705, height: 455},
  'double': {width: 468, height: 458},
  'triple': {width: 304, height: 455}
};

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener(`load`, () => resolve(img));
    img.addEventListener(`error`, () => {
      reject(new Error(`Failed to load image's URL: ${url}`));
    });
    img.src = url;
  });
};


const loadImages = (data) => {
  for (const question of data) {
    question.answers.forEach((answer) => {
      loadImage(answer.picSrc)
      .then((img) => {
        let resized = resize(frameSizes[question.type], {width: img.naturalWidth, height: img.naturalHeight});
        answer.width = resized.width;
        answer.height = resized.height;
      });
    });
  }
};

export const preloadImages = (data) => {
  return new Promise((resolve) => {
    loadImages(data);
    resolve(data);
  });
};

