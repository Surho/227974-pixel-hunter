import IntroScreen from "./screen/intro-screen.js";
import GreetingScreen from "./screen/greeting-screen.js";
import RulesScreen from "./screen/rules-screen.js";
import Header from "./screen/header.js";
import {render} from './utils.js';
import GameScreen from "./screen/game-screen.js";
import Stats from './screen/stats-screen.js';
import {countFinalStatistics} from './utils.js';

export default class Application {

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
    const gameScreen = new GameScreen(model);
    render(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(statistics, state) {
    const stats = new Stats(statistics, state);
    const header = new Header(null, false);
    render(header.element, stats.element);
  }
}

