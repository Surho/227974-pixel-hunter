
export function resize(frame, given) {
  const required = {
    width: 0,
    height: 0
  };

  let ratio = (given.width >= given.height) ? given.height / given.width : given.width / given.height;

  if (given.width >= frame.width && given.height >= frame.height) {

    let extraWidth = given.width - frame.width;
    let extraHeight = given.height - frame.height;

    if (extraWidth === 0 && extraHeight === 0) {
      return frame;
    }

    if (extraWidth >= extraHeight) {
      required.width = frame.width;
      required.height = Math.round(frame.width * ratio);
      if(required.height > frame.height) {
          resize(frame, required);
      }
    } else {
      required.height = frame.height;
      required.width = Math.round(frame.height * ratio);
      if(required.width > frame.width) {
          resize(frame, required);
      }
    }
    return required;
  }

  if (given.width >= frame.width) {
    required.width = frame.width;
    required.height = Math.round(frame.width * ratio);
  }
  if (given.height >= frame.height) {
    required.height = frame.height;
    required.width = Math.round(frame.height * ratio);
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
