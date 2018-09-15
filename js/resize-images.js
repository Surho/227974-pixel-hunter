import {resize} from './resize.js';

const frameSizes = {
  'wide': {width: 705, height: 455},
  'double': {width: 468, height: 458},
  'triple': {width: 304, height: 455}
};

const resizeImages = (answers, type) => {

  for (const answer of answers) {
    const url = answer.picSrc;
    const img = document.createElement(`img`);
    img.src = url;

    img.onload = () => {
      const given = {width: img.naturalWidth, height: img.naturalHeight};
      const frame = frameSizes[type];
      const resized = resize(frame, given);
      answer.width = resized.width;
      answer.height = resized.height;
    };
  }
};

export const resizeAllImages = (data) => {
  for (const question of data) {
    resizeImages(question.answers, question.type);
  }
  return data;
};


