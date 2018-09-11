export default class Timer {
  constructor() {
    this.TOTAL_TIME = 30;
    this.timeLeft = this.TOTAL_TIME;
    this.timer;
  }

  startCount() {
    this.stopCount();
    let start = new Date();

    this.timer = setInterval(() => {
      let timeUpdate = new Date(new Date() - start);
      this.timeLeft = this.TOTAL_TIME - timeUpdate.getSeconds();

      if(this.timeLeft <= 0) {
        clearInterval(this.timer);
      }
    },1000)
}

  stopCount() {
    this.timeLeft = this.TOTAL_TIME
    clearInterval(this.timer);
  }
};

