import IntroScreen from "./screen/intro-screen.js";
import GreetingScreen from "./screen/greeting-screen.js";
import RulesScreen from "./screen/rules-screen.js";
import Header from "./screen/header.js";
import {render} from './utils.js';
import GameScreen from "./screen/game-screen.js";
import Stats from './screen/stats-screen.js';
import {countFinalStatistics} from './utils.js';
import ErrorScreen from './screen/error-screen.js';
import {adaptServerData} from './data/data-adapter.js';
import {resizeAllImages} from './resize-images.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let gameData;

export default class Application {

  static startGame() {
    Application.showIntro();
    document.body.classList.add(`loading`);

    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => adaptServerData(data))
    .then((adaptedData) => resizeAllImages(adaptedData))
    .then((resizedData) => {
      gameData = resizedData;
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
    if (model.ifGameEnds()) {
      const statistics = countFinalStatistics(model._state);
      Application.showStats(statistics, model._state);
      return;
    }
    model.data = gameData;
    const gameScreen = new GameScreen(model);
    render(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(statistics, state) {
    const stats = new Stats(statistics, state);
    const header = new Header(null, false);
    render(header.element, stats.element);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    render(errorScreen.element);
  }
}


