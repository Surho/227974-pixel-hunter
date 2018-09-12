import IntroScreen from "./screen/IntroScreen.js";
import GreetingScreen from "./screen/GreetingScreen.js";
import RulesScreen from "./screen/RulesScreen.js";
import Header from "./screen/header.js";
import {render} from './utils.js';
import GameScreen from "./screen/GameScreen.js";
import GameModel from './GameModel.js';
import Stats from './screen/StatsScreen.js';

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

  static showGame(playerName) {
    const model = new GameModel(playerName);
    const gameScreen = new GameScreen(model);
    gameScreen.startGame();
  }

  static showStats(statistics, state) {
    const stats = new Stats(statistics, state);
    const header = new Header(null, false);
    render(header.element, stats.element);
  }
}


