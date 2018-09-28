(function () {
  'use strict';

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      const element = document.createElement(`template`);
      element.innerHTML = this.template;
      return element.content;
    }

    bind() {

    }
  }

  class IntroView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`;
    }

    onNextClick() {
    }

    bind() {
      const buttonNext = this.element.querySelector(`.intro__asterisk`);

      buttonNext.addEventListener(`click`, () => {
        this.onNextClick();
      });
    }
  }

  class IntroScreen {
    constructor() {
      this.view = new IntroView();

      this.view.onNextClick = () => {
        Application.showGreeting();
      };
    }

    get element() {
      return this.view.element;
    }
  }

  class GreetingView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<section class="greeting central--blur">
      <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
      <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
      <div class="greeting__challenge">
        <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
        <p class="greeting__challenge-text">Правила игры просты:</p>
        <ul class="greeting__challenge-list">
          <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
          <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
          <li>Фотореализм обманчив и коварен.</li>
          <li>Помни, главное — смотреть очень внимательно.</li>
        </ul>
      </div>
      <button class="greeting__continue" type="button">
        <span class="visually-hidden">Продолжить</span>
        <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-right"></use>
        </svg>
      </button>
    </section>`;
    }

    onNextClick() {
    }

    bind() {
      const buttonNext = this.element.querySelector(`.greeting__continue`);

      buttonNext.addEventListener(`click`, () => {
        this.onNextClick();
      });
    }
  }

  class GreetingScreen {
    constructor() {
      this.view = new GreetingView();

      this.view.onNextClick = () => {
        Application.showRules();
      };
    }

    get element() {
      return this.view.element;
    }
  }

  class RulesView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится 30 секунд.</li>
        <li>Ошибиться можно не более 3 раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;
    }

    onKeyUp() {
    }

    onNextClick() {
    }

    bind() {
      const rulesForm = this.element.querySelector(`.rules__input`);
      const buttonNext = this.element.querySelector(`.rules__button`);

      rulesForm.addEventListener(`keyup`, (evt) => {
        buttonNext.disabled = this.onKeyUp(evt.target.value);
      });

      buttonNext.addEventListener(`click`, () => {
        this.onNextClick(rulesForm.value);
      });
    }
  }

  const gameState = {
    currentTime: 30,
    question: 0,
    lives: 3,
    answers: [],
    result: null
  };

  const InitialValue = {
    LIVES: 3,
    QUESTION_NUMBER: 0
  };

  const Points = {
    CORRECT: 100,
    BONUS: 50
  };

  const TimeBorder = {
    FAST: 10,
    SLOW: 20
  };

  const main = document.querySelector(`#main`);

  const render = (...elements) => {
    main.innerHTML = ``;
    elements.forEach((element) => {
      main.appendChild(element);
    });
  };

  const getElementFromHTML = (str) => {
    const element = document.createElement(`template`);
    element.innerHTML = str;
    return element.content;
  };

  const gameStateReset = () => {
    gameState.question = InitialValue.QUESTION_NUMBER;
    gameState.lives = InitialValue.LIVES;
    gameState.answers = [];
    gameState.result = null;
  };

  const countFinalStatistics = (state) => {
    const answerStatistics = {sum: 0, answersOrder: [], fast: 0, normal: 0, slow: 0,
      lives: state.lives, total: 0};

    state.answers.forEach((answer) => {
      if (!answer.isCorrect) {
        answerStatistics.answersOrder.push(`wrong`);
      }

      if (answer.isCorrect) {
        answerStatistics.sum += Points.CORRECT;
        if (answer.time < TimeBorder.FAST) {
          answerStatistics.answersOrder.push(`fast`);
          answerStatistics.fast += 1;
          answerStatistics.sum += Points.BONUS;
        }
        if (answer.time > TimeBorder.SLOW) {
          answerStatistics.answersOrder.push(`slow`);
          answerStatistics.slow += 1;
          answerStatistics.sum -= Points.BONUS;
        }
        if (answer.time >= TimeBorder.FAST && answer.time <= TimeBorder.SLOW) {
          answerStatistics.answersOrder.push(`normal`);
          answerStatistics.normal += 1;
        }
      }
    });
    answerStatistics.sum += (state.lives * Points.BONUS);

    answerStatistics.total = (answerStatistics.normal + answerStatistics.fast + answerStatistics.slow) * Points.CORRECT;

    if (answerStatistics.lives < 0) {
      answerStatistics.total = `fail`;
      answerStatistics.sum = 0;
    }

    answerStatistics.result = state.result;

    return answerStatistics;
  };

  const QUESTION_TIME = 30;

  class GameModel {
    constructor(playerName) {
      this.playerName = playerName;
      this._state = Object.assign({}, gameState);
      this.data = {};
    }

    answersCheck(...answers) {
      let isCorrect;
      const currentQuestion = this.getCurrentQuestion();
      const questionVariants = currentQuestion.answers.map((answer) => {
        return answer.value;
      });

      if (questionVariants.length === 1) {
        isCorrect = (answers[0] === questionVariants[0]);
      }

      if (questionVariants.length === 2) {
        isCorrect = questionVariants.every((answer, i) => {
          return answer === answers[i];
        });
      }

      if (questionVariants.length === 3) {
        let double = 0;
        questionVariants.forEach((answer) => {
          if (answer === answers[0]) {
            double += 1;
          }
        });
        isCorrect = !(double === 2);
      }
      if (isCorrect === false) {
        this._state.lives -= 1;
      }
      return isCorrect;
    }

    saveAnswer(answer) {
      answer.time = QUESTION_TIME - this._state.currentTime;
      this._state.answers.push(answer);
    }

    getCurrentQuestion() {
      return this.data[this._state.question];
    }

    incrementCurrentQuestion() {
      this._state.question += 1;
    }

    checkLives() {
      return this._state.lives < 0;
    }

    checkQuestionsEnd() {
      return this._state.question >= this.data.length;
    }

    checkHurry() {
      return this._state.currentTime <= 5;
    }

    checkTimeEnd() {
      if (this._state.currentTime < 0) {
        this._state.lives -= 1;
        this.setCurrentTime(QUESTION_TIME);
        return true;
      }
      return false;
    }

    checkIfGameEnds() {
      if (this.checkLives()) {
        this._state.result = `Fail &#128078;`;
        return true;
      }
      if (this.checkQuestionsEnd()) {
        this._state.result = `Победа &#127881;`;
        return true;
      }
      return false;
    }

    setCurrentTime(time) {
      this._state.currentTime = time;
    }

    countStatistics() {
      const statistics = countFinalStatistics(this._state);
      this.statistics = statistics;
      statistics.answers = this._state.answers;
      statistics.playerName = this.playerName;
      return statistics;
    }
  }

  class RulesScreen {
    constructor() {
      this.view = new RulesView();

      this.view.onNextClick = (playerName) => {
        const model = new GameModel(playerName);
        Application.showGame(model);
      };

      this.view.onKeyUp = (value) => {
        return !value;
      };
    }

    get element() {
      return this.view.element;
    }
  }

  const LIVES = 3;

  class HeaderView extends AbstractView {
    constructor(state, isGameScreen = true) {
      super();
      this.isGameScreen = isGameScreen;
      this.state = state;
    }

    get template() {
      if (this.isGameScreen) {
        return this.getGameTemplate();
      } else {
        return this.getNonGameTemplate();
      }
    }

    getNonGameTemplate() {
      return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    </header>`;
    }

    getGameTemplate() {
      return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      <div class="game__timer">${this.state.currentTime}</div>
      <div class="game__lives">
        ${new Array(LIVES - this.state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
        ${new Array(this.state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
      </div>
    </header>`;
    }

    onBackButtonClick() {
    }

    bind() {
      const buttonBack = this.element.querySelector(`.back`);

      buttonBack.addEventListener(`click`, () => {
        this.onBackButtonClick();
      });
    }

  }

  class Header {
    constructor(state, isGame, timer) {
      this.view = new HeaderView(state, isGame);

      this.view.onBackButtonClick = () => {
        if (timer) {
          timer.stopCount();
        }
        gameStateReset();
        Application.showGreeting();
      };
    }

    get element() {
      return this.view.element;
    }
  }

  const PictureType = {
    TYPE1: `wide`,
    TYPE2: `double`,
    TYPE3: `triple`
  };

  class GameView extends AbstractView {
    constructor(question) {
      super();
      this.question = question;
    }

    get template() {
      let template;
      switch (this.question.type) {
        case PictureType.TYPE3:
          template = this._getTemplate3(this.question);
          break;
        case PictureType.TYPE1:
          template = this._getTemplate1(this.question);
          break;
        default:
          template = this._getTemplate2(this.question);
      }
      return `<section class="game">
                <p class="game__task">${this.question.taskText}</p>
                <form class="game__content game__content--${this.question.type}">
                  ${template}
                </form>
              </section>`;
    }

    _getTemplate3(question) {
      return `<div class="game__option" data-value=${question.answers[0].value}>
      <img src="${question.answers[0].picSrc}" alt="Option 1" width=${question.answers[0].width} height=${question.answers[0].height}>
    </div>
    <div class="game__option" data-value=${question.answers[1].value}>
      <img src="${question.answers[1].picSrc}" alt="Option 2" width=${question.answers[1].width} height=${question.answers[1].height}>
    </div>
    <div class="game__option" data-value=${question.answers[2].value}>
      <img src="${question.answers[2].picSrc}" alt="Option 3" width=${question.answers[2].width} height=${question.answers[2].height}>
    </div>`;
    }

    _getTemplate2(question) {
      return question.answers.map((answer, i) => {
        return `<div class="game__option">
      <img src="${answer.picSrc}" alt="Option 1" width=${question.answers[i].width} height=${question.answers[i].height}>
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question${i}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question${i}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;
      }).join(``);
    }

    _getTemplate1(question) {
      return `<div class="game__option">
        <img src="${question.answers[0].picSrc}" alt="Option 1" width=${question.answers[0].width} height=${question.answers[0].height}>
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
    }

    onChangeType1() {}
    onChangeType2() {}
    onClick() {}

    bind() {
      const screen = this.element.querySelector(`.game__content`);

      if (this.question.type === PictureType.TYPE1) {
        screen.addEventListener(`change`, (evt) => {
          this.onChangeType1(evt.target.value);
        });
      }

      if (this.question.type === PictureType.TYPE2) {
        screen.addEventListener(`change`, (evt) => {
          this.onChangeType2(evt.target.value, evt.target.name);
        });
      }

      if (this.question.type === PictureType.TYPE3) {
        screen.addEventListener(`click`, (evt) => {
          let target = evt.target;
          while (!target.dataset.value) {
            target = target.parentElement;
          }
          this.onClick(target.dataset.value);
        });
      }
    }
  }

  const QUESTIONS_NUMBER = 10;

  class StatsLineView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      let stats = ``;
      this.state.answers.forEach((answer) => {
        if (answer.isCorrect === false) {
          stats += `<li class="stats__result stats__result--wrong"></li>\n`;
          return;
        }
        if (answer.time < 10) {
          stats += `<li class="stats__result stats__result--fast"></li>\n`;
          return;
        }
        if (answer.time > 20) {
          stats += `<li class="stats__result stats__result--slow"></li>\n`;
          return;
        }
        stats += `<li class="stats__result stats__result--correct"></li>\n`;
      });

      stats += `${new Array(QUESTIONS_NUMBER - this.state.answers.length).fill(`
    <li class="stats__result stats__result--unknown"></li>\n`).join(``)}`;

      return `<ul class="stats">
      ${stats}
      </ul>`;
    }
  }

  const statsLine = (state) => {
    const view = new StatsLineView(state);
    return view.element;
  };

  const TOTAL_TIME = 30;

  class Timer {
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

  const PictureTypeName = {
    NAME0: `question0`,
    NAME1: `question1`
  };

  class GameScreen {
    constructor(model) {
      this.model = model;
      this.timer = new Timer((timeLeft, reset) => {
        this.model.setCurrentTime(timeLeft);

        if (!reset) {
          if (this.model.checkHurry()) {
            this.container.classList.add(`should-Hurry`);
          }
          if (!this.timeCheck()) {
            this.updateHeader();
          }
        }
      }, false);

      this.timer.resetTime();
      this.header = new Header(this.model._state, true).element;
      this.container = document.createElement(`div`);
      this.statsLine = statsLine(this.model._state);

      this.createGameContent = () => {
        this.view = new GameView(this.model.getCurrentQuestion());
        this.initScreen();
        return this.view.element;
      };
      this.gameContent = this.createGameContent();
    }

    initScreen() {
      this.view.onChangeType1 = (value) => {
        let isCorrect = this.model.answersCheck(value);
        this.model.incrementCurrentQuestion();
        this.model.saveAnswer({answers: value, isCorrect});
        this.timer.stopCount();
        Application.showGame(this.model);
      };

      let gameChoice0 = null;
      let gameChoice1 = null;
      this.view.onChangeType2 = (value, name) => {
        if (name === PictureTypeName.NAME0) {
          gameChoice0 = value;
        }
        if (name === PictureTypeName.NAME1) {
          gameChoice1 = value;
        }
        if (gameChoice0 && gameChoice1) {
          let isCorrect = this.model.answersCheck(gameChoice0, gameChoice1);
          this.model.incrementCurrentQuestion();
          this.model.saveAnswer({answers: [gameChoice0, gameChoice1], isCorrect});
          this.timer.stopCount();
          Application.showGame(this.model);
        }
      };

      this.view.onClick = (value) => {
        let isCorrect = this.model.answersCheck(value);
        this.model.incrementCurrentQuestion();
        this.model.saveAnswer({answers: value, isCorrect});
        this.timer.stopCount();
        Application.showGame(this.model);
      };
    }

    timeCheck() {
      if (this.model.checkTimeEnd()) {
        this.model.incrementCurrentQuestion();
        this.model.saveAnswer({answers: null, isCorrect: false});
        Application.showGame(this.model);
        return true;
      }
      return false;
    }

    updateHeader() {
      const newHeader = new Header(this.model._state, true, this.timer);
      this.container.replaceChild(newHeader.element, this.container.firstChild);
      this.header = newHeader;
    }

    startGame() {
      if (this.container.classList.contains(`should-Hurry`)) {
        this.container.classList.remove(`should-Hurry`);
      }
      this.timer.startCount();
    }

    get element() {
      this.container.appendChild(this.header);
      this.container.appendChild(this.gameContent);
      this.container.appendChild(this.statsLine);

      return this.container;
    }
  }

  class StatsView extends AbstractView {
    constructor(model) {
      super();
      this.state = model._state;
    }

    get template() {
      return `<section class="result">
      <h2 class="result__title">scores are loading...</h2>
    </section>`;
    }

    showResultsTable(score) {
      return `<section class="result">
      <h2 class="result__title">${this.state.result}</h2>
      <h3 class="result__name">Результаты игрока:<h3>
      <table class="result__table">
        ${score.map((it, i) => `
          <tr>
            <td class="result__number">${i + 1}.</td>
            <td colspan="2">
              ${new StatsLineView(it).template}
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">${it.total}</td>
          </tr>
          ${this._getFastBonusTemplate(it.fast)}
          ${this._getLivesBonusTemplate(it.lives)}
          ${this._getSlowBonusTemplate(it.slow)}
          <tr>
            <td colspan="5" class="result__total  result__total--final">${it.sum}</td>
          </tr>`).join(``)}
        </table>
      </section>`;
    }

    _getFastBonusTemplate(fast) {
      if (fast > 0) {
        return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fast}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${fast * 50}</td>
      </tr>`;
      }
      return ``;
    }

    _getSlowBonusTemplate(slow) {
      if (slow > 0) {
        return `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slow}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-${slow * 50}</td>
      </tr>`;
      }
      return ``;
    }

    _getLivesBonusTemplate(lives) {
      if (lives > 0) {
        return `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${lives * 50}</td>
      </tr>`;
      }
      return ``;
    }
  }

  class Stats {
    constructor(model) {
      this.view = new StatsView(model);
    }

    get element() {
      return this.view.element;
    }
  }

  class ErrorView extends AbstractView {
    constructor(error) {
      super();
      this.error = error;
    }

    get template() {
      return `<section class="modal">
      <div class="modal__inner">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text modal__text--error">${this.error.name}: ${this.error.message}</p>
      </div>
    </section>`;
    }
  }

  class ErrorScreen {
    constructor(error) {
      this.view = new ErrorView(error);
    }

    get element() {
      return this.view.element;
    }
  }

  const resize = (frame, given) => {
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
  };

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

  const preloadImages = (data) => {
    return new Promise((resolve) => {
      loadImages(data);
      resolve(data);
    });
  };

  const preprocessType = (question) => {
    switch (question.type) {
      case `tinder-like`:
        return `wide`;
      case `two-of-two`:
        return `double`;
      case `one-of-three`:
        return `triple`;
    }
    return false;
  };

  const preprocessAnswers = (question) => {
    const preprocessedAnswers = [];
    for (const answer of question.answers) {
      preprocessedAnswers.push({
        picSrc: answer.image.url,
        value: (answer.type === `painting`) ? answer.type.slice(0, 5) : answer.type,
        width: answer.image.width,
        height: answer.image.height
      });
    }
    return preprocessedAnswers;
  };

  const adaptServerData = (data) => {
    const adaptedData = [];
    for (const question of data) {
      adaptedData.push({
        type: preprocessType(question),
        taskText: question.question,
        answers: preprocessAnswers(question)
      });
    }
    return adaptedData;
  };

  const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

  const DEFAULT_NAME = `syh`;
  const APP_ID = 24041992;

  const checkStatus = (response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  const toJSON = (res) => res.json();

  class Loader {
    static loadData() {
      return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptServerData);
    }

    static loadResults(name = DEFAULT_NAME) {
      return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
    }

    static saveResults(data, name = DEFAULT_NAME) {
      data = Object.assign({name}, data);
      const requestSettings = {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': `application/json`
        },
        method: `POST`
      };
      return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
    }
  }

  let gameData;

  class Application {

    static startGame() {
      Application.showIntro();
      document.body.classList.add(`loading`);

      Loader.loadData()
      .then((data) => preloadImages(data))
      .then((data) => {
        gameData = data;
      })
      .then(() => Application.showGreeting())
      .catch((err) => Application.showError(err))
      .then(() => document.body.classList.remove(`loading`));
    }

    static showIntro() {
      const intro = new IntroScreen();
      render(intro.element);
    }

    static showGreeting() {
      const greeting = new GreetingScreen();
      render(greeting.element);
    }

    static showRules() {
      const rules = new RulesScreen();
      const header = new Header(null, false);
      render(header.element, rules.element);
    }

    static showGame(model) {
      if (model.checkIfGameEnds()) {
        Application.showStats(model);
        return;
      }
      model.data = gameData;
      const gameScreen = new GameScreen(model);
      render(gameScreen.element);
      gameScreen.startGame();
    }

    static showStats(model) {
      const stats = new Stats(model);
      const header = new Header(null, false);
      render(stats.element);

      let score = Object.assign({date: new Date()}, model.countStatistics());
      let playerName = score.playerName;

      Loader.saveResults(score, playerName)
      .then(() => Loader.loadResults(playerName))
      .then((data) => data.reverse())
      .then((data) => getElementFromHTML(stats.view.showResultsTable(data)))
      .then((statsElement) => {
        const name = statsElement.querySelector(`.result__name`);
        name.textContent = `Результаты игрока: ${playerName}`;
        return statsElement;
      })
      .then((statsElement) => render(header.element, statsElement))
      .catch(Application.showError);
    }

    static showError(error) {
      const errorScreen = new ErrorScreen(error);
      render(errorScreen.element);
    }
  }

  Application.startGame();

}());

//# sourceMappingURL=main.js.map
