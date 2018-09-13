const TOTAL_TIME = 30;

export default class Timer {
  constructor(callback) {
    this.timeLeft = TOTAL_TIME;
    this.timer = null;
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

      this.callback(this.timeLeft);

    }, 1000);
  }


  stopCount() {
    this.timeLeft = TOTAL_TIME;
    clearInterval(this.timer);
  }
}


