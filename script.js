var questionsAns = [{
    question: "How many days are there in a week ?",
    answers: [{
        text: "8 days",
        correct: false,
      },
      {
        text: "11 days",
        correct: false,
      },
      {
        text: "6 days",
        correct: false,
      },
      {
        text: "7 days",
        correct: true,
      },
    ],
  },
  {
    question: "How many hours are there in a day ?",
    answers: [{
        text: "24 hour",
        correct: true,
      },
      {
        text: "14 hour",
        correct: false,
      },
      {
        text: "14 hour",
        correct: false,
      },
      {
        text: "7 hour",
        correct: false,
      },
    ],
  },
  {
    question: "Rainbow consist of how many colors ?",
    answers: [{
        text: "8 colors",
        correct: false,
      },
      {
        text: "11 colors",
        correct: false,
      },
      {
        text: "7 colors",
        correct: true,
      },
      {
        text: "6 colors",
        correct: false,
      },
    ],
  },
  {
    question: "How many minutes are there in an hour ?",
    answers: [{
        text: "60 minutes",
        correct: true,
      },
      {
        text: "160 minutes",
        correct: false,
      },
      {
        text: "30 minutes",
        correct: false,
      },
      {
        text: "640 minutes",
        correct: false,
      },
    ],
  },
  {
    question: " How many colors in India flag ?",
    answers: [{
        text: "1 colors",
        correct: false,
      },
      {
        text: "4 colors",
        correct: true,
      },
      {
        text: "3 colors",
        correct: false,
      },
      {
        text: "2 colors",
        correct: false,
      },
    ],
  },
];
const timer = document.querySelector('#timer')
var time = 11

function setTimer() {
  timer.style.color = "#002765";

  clock = setInterval(() => {
    time--;
    timer.innerHTML = time
    if (time <= 3) {
      timer.style.color = "red"
    }
    if (time === 0) {
      clearInterval(clock);
      console.log(time);
      Array.from(answers.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.style.background = "#9aeabc";
          button.disabled = true;
          nextBtn.style.display = "block";
        }
        button.disabled = true;
        nextBtn.style.display = "block";
      });
      timer.style.display = "none";
    }
  }, 1000);
}

const question = document.querySelector(".question");
const nextBtn = document.querySelector(".btn");
const ansBtn = document.querySelector(".ans_btn");
const answers = document.querySelector(".ans");
const next = document.querySelector("#next");
// let questionNumber = questionIndex + 1;
let score = 0;
let questionIndex = 0;

function getQuestion() {
  time = 11
  setTimer();
  timer.style.display = "block";
  resetState();
  question.innerHTML = `${questionIndex+1}. ${questionsAns[questionIndex].question}`;
  questionsAns[questionIndex].answers.forEach((answer) => {
    const ansButton = document.createElement("button");
    ansButton.innerHTML = answer.text;
    ansButton.classList.add("ans_btn");
    answers.appendChild(ansButton); // its add all elements class name
    if (answer.correct) {
      ansButton.dataset.correct = answer.correct;

    } //todo Bujta pari ni
    ansButton.addEventListener("click", userInputAnswer)

  });
}


function resetState() {
  nextBtn.style.display = "none";

  while (answers.firstChild) { // fast child takla ntake remove korba ata kondisan ok
    answers.removeChild(answers.firstChild); // lats remove the fast child takla one by one
  }
}

function userInputAnswer(event) {
  const selectButton = event.target;
  const isCurrentAnswer = selectButton.dataset.correct === "true";
  clearInterval(clock) // timer
  if (isCurrentAnswer) {
    // selectButton.classList.add("correct");
    selectButton.style.background = "#9aeabc";
    score++
  } else {
    // selectButton.classList.add("incorrect");
    selectButton.style.background = "#ff9393"
  }
  Array.from(answers.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.style.background = "#9aeabc";
      button.disabled = true;
      nextBtn.style.display = "block";
    }
    button.disabled = true;
    nextBtn.style.display = "block";
  })

}

function showScore() {
  resetState()
  question.innerHTML = `Your score is ${score} out of ${questionsAns.length}`
  next.innerHTML = "Play Again"
  nextBtn.style.display = "block"

}

function handleNextButton() {
  questionIndex++;
  if (questionIndex < questionsAns.length) {
    getQuestion()

  } else {
    // questionIndex=-1
    timer.style.display = "none"
    showScore()
  }
}

function startQuiz() {
  questionIndex = 0
  getQuestion()
  timer.style.display = "block";
}
nextBtn.addEventListener("click", () => {
  nextBtn.style.display = "none";
  if (questionIndex < questionsAns.length) {
    handleNextButton()
  } else {
    startQuiz()
  }
})
getQuestion()