class Timer {
  constructor() {
    this.TOTAL_TIME = 30;
    this.timeLeft = this.TOTAL_TIME;
    this.timer = null;
  }

  startCount(callback) {
    this.stopCount();
    let start = new Date();

    this.timer = setInterval(() => {
      let timeUpdate = new Date(new Date() - start);
      this.timeLeft = this.TOTAL_TIME - timeUpdate.getSeconds();

      if (this.timeLeft < 0) {
        clearInterval(this.timer);
      }

      callback(this.timeLeft);

    }, 1000);
  }

  stopCount() {
    this.timeLeft = this.TOTAL_TIME;
    clearInterval(this.timer);
  }
}

export const timer = () => {
  return new Timer();
};

