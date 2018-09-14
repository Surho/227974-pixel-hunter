const TOTAL_TIME = 30;

export default class Timer {
  constructor(callback, reset) {
    this.timeLeft = TOTAL_TIME;
    this.timer = null;
    this.reset = reset;
    this.callback = callback;
  }

  startCount() {

    this.stopCount();
    let start = Date.now();

    this.timer = setInterval(() => {
      let timeUpdate = Math.round((Date.now() - start) / 1000);
      this.timeLeft = TOTAL_TIME - timeUpdate;

      if (this.timeLeft < 0) {
        clearInterval(this.timer);
      }

      this.callback(this.timeLeft, this.reset);

    }, 1000);
  }

  resetTime() {
    this.reset = true;
    this.callback(TOTAL_TIME, this.reset);
    this.reset = false;
  }


  stopCount() {
    this.timeLeft = TOTAL_TIME;
    clearInterval(this.timer);
  }
}


