import IntroScreen from "./screen/introScreen.js";
import GreetingScreen from "./screen/greetingScreen.js";
import RulesScreen from "./screen/rulesScreen.js";
import Header from "./screen/header.js";
import {render} from './utils.js';
import GameScreen from "./screen/gameScreen.js";
import Stats from './screen/statsScreen.js';
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


