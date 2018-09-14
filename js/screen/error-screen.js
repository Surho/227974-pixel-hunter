import ErrorView from "../view/error-view.js";

export default class ErrorScreen {
  constructor(error) {
    this.error = new ErrorView(error);
  }

  get element() {
    return this.error.element;
  }
}
