import IntroScreen from "./screen/intro-screen.js";
import GreetingScreen from "./screen/greeting-screen.js";
import RulesScreen from "./screen/rules-screen.js";
import Header from "./screen/header.js";
import {render} from './utils.js';
import GameScreen from "./screen/game-screen.js";
import Stats from './screen/stats-screen.js';
import ErrorScreen from './screen/error-screen.js';
import {preloadImages} from './preload-images.js';
import {getElementFromHTML} from './utils.js';
import Loader from './loader.js';


let gameData;

export default class Application {

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


