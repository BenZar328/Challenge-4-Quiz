let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerId = document.getElementById("timer");
let start = document.getElementById("start-page");
let quizContainer = document.getElementById("quiz");
let quizQuestion = document.getElementById("quiz-question");
let quizOptions = document.getElementById("quiz-options");
let quizScore = document.getElementById("score");
let startButton = document.getElementById("start-button");
let gameOver = document.getElementById("game-over");
let initialsInput = document.getElementById("initials");
let saveScore = document.getElementById("save-score");

const quizData = [
    {
      question: "Question 1: Who is Harry's best friend?",
      options: ["Shrek", "Ron Weasley", "Tom Riddle", "Frodo"],
      answer: "Ron Weasley",
    },
    {
      question: "Question 2: What type of creature is Dobby?",
      options: ["Elf", "Snake", "Spider", "Vampire"],
      answer: "Elf",
    },
    {
      question: "Question 3: What is Hagrid's Job?",
      options: ["Coach", "Grounds Keeper", "Accountant", "Professor"],
      answer: "Grounds Keeper",
    },
  ];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    start.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
    startTimer();
}

function startTimer() {
    const timerInterval = setInterval(function () {
      timeLeft--;
      timerId.textContent = "Time Left: " + timeLeft;
      if (timeLeft <= 0 || currentQuestion === quizData.length) {
        clearInterval(timerInterval);
        showScore();
      }
    }, 1000);
  }

function showQuestion() {
    let question = quizData[currentQuestion];
    quizQuestion.innerText = question.question;
    quizOptions.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
      const option = document.createElement("button");
      option.innerText = question.options[i];
      option.addEventListener("click", function () {
        checkAnswer(option.innerText);
      });
      quizOptions.appendChild(option);
    }
  }

function checkAnswer(selectedOption) {
    let question = quizData[currentQuestion];
    if (selectedOption === question.answer) {
      alert("Correct!");
    } else {
      alert("Incorrect");
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
    currentQuestion++;
    if (currentQuestion === quizData.length) {
      showScore();
    } else {
      showQuestion();
    }
  }

function showScore() {
    gameOver.style.display = "block";
    quizContainer.style.display = "none";
    timerId.style.display = "none";
    score = timeLeft;
    quizScore.textContent = "Your Score: " + score;
    saveScore.addEventListener("click", savePlayerScore);
  }

function savePlayerScore() {
    const scoreLog = {
      initials: initialsInput.value,
      finalScore: score,
    };
    localStorage.setItem("scoreLog", JSON.stringify(scoreLog));
  }
