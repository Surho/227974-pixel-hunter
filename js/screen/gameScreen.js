import {answersCheck, countFinalStatistics} from '../utils.js';
import GameView from '../view/game-view.js';
import {resizePicsOnScreen} from '../resize.js';
import Header from './header.js';
import {statsLine} from './statsLine.js';
import Application from '../Application.js';
import {timer} from '../timer.js';

const TYPE_2PICTURE_NAME0 = `question0`;
const TYPE_2PICTURE_NAME1 = `question1`;
export default class GameScreen {
  constructor (model) {
    /**
     * создаем по модели GameScreen,
     * this.hurryClassAdded нужен исключительно во
     * избежание повторных добавлений класса мигания таймера (за 5 сек);
     */
    this.model = model;
    this.timer = timer();
    this.hurryClassAdded = false;
    this.mainContainer = document.getElementById(`main`);
    /**
     * начальные header и statsLine, далее
     * постоянно пересоздаются
     */
    this.header = new Header(this.model._state, true);
    this.statsLine = statsLine(this.model._state);

    /**
     * создаем игровую область, на основе текущего
     * вопроса , взятого из модели.
     * Затем вешаем обработчики и подгоняем картинки под рамки
     */
    this.createGameContent = () => {
      this.gameView = new GameView(this.model.getCurrentQuestion());
      this.initScreen();
      resizePicsOnScreen(this.gameView.element);
      return this.gameView.element;
    }
    this.gameContent = this.createGameContent();
  }

    /**
     * Обработчики в зависимостиот типа вопроса.
     * Порядок один и тот же:
     * -проверяем корректность пользовательского ввода,
     * -в модели увеличиваем номер вопроса
     * -сохраняем ответ, при это учет времени текущего состояния ведется
     * в модели, как this._state.currentTime, время добавляется к обьекту
     * ответа в модели
     * -обновляем header, stats, gameContent на основе изменившегося состояния
     * (номера вопроса);
     */
  initScreen() {
    this.gameView.onChangeType1 = (value) => {
      let isCorrect = answersCheck(this.model._state, value);
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: value, isCorrect});
      this.updateGame(this.model._state);
    };

    let gameChoice0 = null;
    let gameChoice1 = null;
    this.gameView.onChangeType2 = (value, name) => {
      if (name === TYPE_2PICTURE_NAME0) {
        gameChoice0 = value;
      }
      if (name === TYPE_2PICTURE_NAME1) {
        gameChoice1 = value;
      }
      if (gameChoice0 && gameChoice1) {
        let isCorrect = answersCheck(this.model._state, gameChoice0, gameChoice1);
        this.model.incrementCurrentQuestion();
        this.model.saveAnswer({answers: [gameChoice0, gameChoice1], isCorrect});
        this.updateGame(this.model._state);
      }
    };

    this.gameView.onClick = (value) => {
      let isCorrect = answersCheck(this.model._state, value);
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers: value, isCorrect});
      this.updateGame(this.model._state);
    };
  }

  /**
   * проверка:
   * если истекло время то сохраняем пустой вопрос и
   * обновляем, идем у след вопросу (жизнь вычетает сама
   * this.model.ifOutOfTime()));
   *
   * если и время и жизни то конец игры, возвращаем
   * true чтобы внутри таймера при true прервать дальнейшее
   * обновление headera
   */

  timeCheck() {
    if(this.model.ifOutOfTime()) {
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers:null,  isCorrect: false});
      this.updateGame(this.model._state);
    }

    if(this.model.ifOutOfTimeAndLives()) {
      this.model.incrementCurrentQuestion();
      this.model.saveAnswer({answers:null,  isCorrect: false});
      this.finish();
      return true;
    }
  }

  updateHeader() {
    const newHeader = new Header(this.model._state, true);
    this.mainContainer.replaceChild(newHeader.element, this.mainContainer.firstChild);
    this.header = newHeader;
  }

  /**
   * тормозим счетчик , фиксируем статистику на основе
   * накопленного состояния и с этой статистикой идем
   * на экран статистики
   */
  finish() {
    this.timer.stopCount();
    const statistics = countFinalStatistics(this.model._state);
    Application.showStats(statistics, this.model._state);
    return;
  }

  /**
   * фактически переход к следующему экрану
   * внутри игрового поля.
   * проверяем сперва не дошли ли мы до конца вопросов/жизней,
   * и если не дошли пересоздаем все наши компоненты и стартуем игру с ними
   */
  updateGame() {
    if(this.model.readyToFinish()) {
      this.finish();
    };
    this.header = new Header(this.model._state, true);
    this.statsLine = statsLine(this.model._state);
    this.gameContent = this.createGameContent();
    this.startGame();
  }

  /**
   * стартуем игру(кэп)
   * - если с прошлого экрана был добавлен класс
   * , добавляющий мигание , то сразу его убираем
   * и ставим флаг, что убрали
   * - скидываем счетчик снова на 30 сек
   * - начинаем отсчет, постоянно передавая
   * оставшееся время в модель в состояние игры this.model.currentTime
   * Далее внутри счетчика ждем стоит ли поторопиться, затем проверяем
   * осталось ли вообще время, если осталось апдейтим хедер.
   *
   * а потом просто отрисовываем свежие компоненты созданные в
   * updateGame().
   */
  startGame() {
    this.mainContainer.classList.remove(`should-Hurry`);
    this.hurryClassAdded = false;

    this.model.resetTime();

    this.timer.startCount((timeLeft) => {
      this.model.setCurrentTime(timeLeft);

      if(this.model.ifShouldHurry() && !this.hurryClassAdded) {
        this.mainContainer.classList.add(`should-Hurry`);
        this.hurryClassAdded = true;
      }

      if(this.timeCheck()) {
        return;
      }

      this.updateHeader();
    });

    this.mainContainer.innerHTML = ``;
    this.mainContainer.appendChild(this.header.element);
    this.mainContainer.appendChild(this.gameContent);
    this.mainContainer.appendChild(statsLine(this.model._state));
  }
};
