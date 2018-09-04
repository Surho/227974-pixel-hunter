
export function resize(frame, given) {

  const DECIMAL_NUMBER = 100;
  const required = {
    width: 0,
    height: 0
  };

  const widthRatio = Math.round((given.width / frame.width) * DECIMAL_NUMBER) / DECIMAL_NUMBER;
  const heightRatio = Math.round((given.height / frame.height) * DECIMAL_NUMBER) / DECIMAL_NUMBER;

  if (widthRatio >= heightRatio) {
    required.width = frame.width;
    required.height = Math.round((given.height / widthRatio) * DECIMAL_NUMBER) / DECIMAL_NUMBER;
    return required;
  }
  if (heightRatio >= widthRatio) {
    required.height = frame.height;
    required.width = Math.round((given.width / heightRatio) * DECIMAL_NUMBER) / DECIMAL_NUMBER;
    return required;
  }
  return required;
}

export function resizePicsOnScreen(screen) {

  const imagesOnScreen = Array.from(screen.querySelectorAll(`img`));
  const imageContainer = screen.querySelector(`.game__option`);

  imagesOnScreen.forEach((image) => {
    image.onload = () => {
      let imageSize = {width: image.clientWidth, height: image.clientHeight};
      let imageContainerSize = {width: imageContainer.clientWidth, height: imageContainer.clientHeight};
      let resized = resize(imageContainerSize, imageSize);

      image.style.width = resized.width + `px`;
      image.style.height = resized.height + `px`;
      image.onload = ``;
    };
  });
}
