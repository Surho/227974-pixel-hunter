export const gameState = {
  question: 0,
  lives: 3,
  answers: [
    {
      time: 15,
      isCorrect: true,
    },
    {
      time: 25,
      isCorrect: true,
    },
    {
      time: 5,
      isCorrect: true,
    },
    {
      time: 15,
      isCorrect: true,
    },
    {
      time: 12,
      isCorrect: false,
    },
    {
      time: 5,
      isCorrect: true,
    },
    {
      time: 5,
      isCorrect: false,
    },
    {
      time: 5,
      isCorrect: true,
    },
    {
      time: 5,
      isCorrect: true,
    },
    {
      time: 5,
      isCorrect: true,
    },
  ]
};


export const questions = [
  {
    type: `wide`,
    taskText: `Угадай, фото или рисунок?`,
    answers: [
      {
        picSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        isPicture: true,
      }
    ],
    nextQuestion() {
      return this.questions[1];
    },
  },
  {
    type: ``,
    taskText: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        picSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        isPicture: true,
      },
      {
        picSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        isPicture: false,
      },
    ],
    nextQuestion() {
      return this.questions[2];
    },
  },
  {
    type: `triple`,
    taskText: `Найдите рисунок среди изображений`,
    answers: [
      {
        picSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        isPicture: true,
      },
      {
        picSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        isPicture: false,
      },
      {
        picSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        isPicture: false,
      },
    ],
    nextQuestion: null,
  }
];
