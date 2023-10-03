const lifeLine = document.querySelectorAll(".line");
const question = document.getElementById("question");
const scoreText = document.querySelector(".score-span");
const progressBar = document.querySelector(".score");
const cells = Array.from(document.getElementsByClassName("cell"));
const cells1 = document.querySelectorAll(".cells");
const fifty = document.querySelector(".fifty-fifty");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const ohTime = document.querySelector(".time-span");
const choiceContainer = document.querySelector(".choice-container");
const showAnswer = document.querySelector(".showAnswer");
const showHostAnswer = document.querySelector(".showHostAnswer");
const tellAnswer = document.querySelector(".tell");
const tellAnswer1 = document.querySelector(".tell1");
const time2 = document.querySelector(".time2");
const host = document.querySelector(".hosts");
// console.log(choiceContainer);
const choices = Array.from(document.getElementsByClassName("choice-text"));
const { userName, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
// console.log(choices);

let currentQuextion = {};
let acceptingAnsers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
// let c = 310;

// let c = 310;

fetch("question.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestion) => {
    questions = loadedQuestion.filter((question) => question.id === room);
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

// constants
const correctBonus = 10;
const maxQuestion = 30;

function startGame() {
  questionCounter = 0;
  score = 0;
  // console.log(room);
  availableQuestions = [...questions];
  // console.log(availableQuestions);

  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
  c = 60;
}

function getNewQuestion() {
  c = 60;
  cells.forEach(function (cell) {
    cell.classList.remove("hidden");
    showHostAnswer.classList.add("hidden");
  });
  // cells.classList.remove("hidden");
  update = setInterval("timer001()", 2000);
  if (availableQuestions.length === 0 || questionCounter >= maxQuestion) {
    //   go to the end page
    return window.location.assign(
      `/end.html?userName=${userName}&room=${room}`
    );
  }

  questionCounter++;
  //   update progress bar
  setInterval(() => {
    progressBar.style.background = `conic-gradient(#0f5132 ${
      (questionCounter / maxQuestion) * 100
    }%, #e1e3e6 ${(questionCounter / maxQuestion) * 100}%)`;
  }, 10);

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuextion = availableQuestions[questionIndex];
  question.innerText = currentQuextion.question;

  choices.forEach(function (choice) {
    // window.clearInterval(update);
    // c = "-";
    const number = choice.dataset["number"];
    choice.innerText = currentQuextion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnsers = true;
}

choices.forEach(function (choice) {
  choice.addEventListener("click", function (e) {
    window.clearInterval(update);
    c = "-";
    if (!acceptingAnsers) return;
    acceptingAnsers = false;
    const selectedChoise = e.target;
    const selcectedAnswer = selectedChoise.dataset["number"];

    const classToApply =
      selcectedAnswer == currentQuextion.answer ? "correct" : "incorrect";

    if (selcectedAnswer != currentQuextion.answer) {
      // currentQuextion.answer.classList.add("green");
      showAnswer.classList.remove("hidden");
      // tellAnswer.innerText = currentQuextion.answer;
      if (currentQuextion.answer == 1) {
        tellAnswer.innerText = "A";
      }
      if (currentQuextion.answer == 2) {
        tellAnswer.innerText = "B";
      }
      if (currentQuextion.answer == 3) {
        tellAnswer.innerText = "C";
      }
      if (currentQuextion.answer == 4) {
        tellAnswer.innerText = "D";
      }
      // tellAnswer.innerText = currentQuextion.answer;
    }

    if (classToApply === "correct") {
      incrementScore(correctBonus);
      localStorage.setItem("recentScore", score);
    }
    selectedChoise.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoise.parentElement.classList.remove(classToApply);
      if (selcectedAnswer != currentQuextion.answer) {
        return window.location.assign(
          `/end.html?userName=${userName}&room=${room}`
        );
      } else {
        getNewQuestion();
      }
    }, 5000);

    // console.log(classToApply);
  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

// time
function timer001() {
  c = c - 1;
  if (c < 17) {
    time2.style.setProperty("--green-dark", "#842029");
    ohTime.style.color = "#842029";
  }
  if (c < 61) {
    ohTime.innerText = c;
  }

  if (c < 1) {
    window.clearInterval(update);
    window.location.assign(`/end.html?userName=${userName}&room=${room}`);
  }
}

// if (c < 6) {
//   time2.style.setProperty("--green-dark", "red");
// }

update = setInterval("timer001()", 1300);

// 5050
fifty.addEventListener("click", function () {
  //   console.log(choiceNumber);
  //   console.log(number);
  const sell = [1, 2, 3, 4];

  const newSell = sell.filter(function (item) {
    return item != currentQuextion.answer;
  });
  // console.log(newSell);

  // console.log(newSell);

  const sellCell = newSell[randomCell()];
  console.log(`random number is ${sellCell}`);
  // });
  // let newsell = cells;

  // console.log(cells);

  cells.forEach(function (cell) {
    cell.classList.add("hidden");
    const cellNumber = cell.dataset["c"];
    // const sellCell = cell.dataset["c"];

    if (cellNumber == currentQuextion.answer) {
      cell.classList.remove("hidden");
    }

    if (sellCell == cellNumber) {
      cell.classList.remove("hidden");
    }
  });

  function randomCell() {
    return Math.floor(Math.random() * newSell.length);
  }
  fifty.disabled = true;
  fifty.classList.add("line-use");
});

host.addEventListener("click", function () {
  showHostAnswer.classList.remove("hidden");
  if (currentQuextion.answer == 1) {
    tellAnswer1.innerText = "A";
  }
  if (currentQuextion.answer == 2) {
    tellAnswer1.innerText = "B";
  }
  if (currentQuextion.answer == 3) {
    tellAnswer1.innerText = "C";
  }
  if (currentQuextion.answer == 4) {
    tellAnswer1.innerText = "D";
  }

  host.disabled = true;
  host.classList.add("line-use");
});
