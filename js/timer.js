 class Timer {
  constructor(time) {
    this.TOTAL_TIME = 30;
    this.timeLeft = this.TOTAL_TIME;
    this.timer;
  }

  startCount(callback) {
    this.stopCount();
    let start = new Date();

    this.timer = setInterval(() => {
      let timeUpdate = new Date(new Date() - start);
      this.timeLeft = this.TOTAL_TIME - timeUpdate.getSeconds();
      callback();
      if(this.timeLeft <= 0) {
        clearInterval(this.timer);
      }
    },1000)
}

  stopCount() {
    this.timeLeft = this.TOTAL_TIME
    clearInterval(this.timer);
  }

  get secondsLeft() {
    return this.this.timeLeft;
  }
};

export const timer = (time) => {
  return new Timer(time);
}

