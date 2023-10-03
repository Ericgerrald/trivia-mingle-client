const userScore = document.getElementById("userScore");
const youLost = document.querySelector(".youLost");
const youWon = document.querySelector(".youWon");
const code = document.querySelector(".code");
const autoTYpe1 = document.getElementById("autoType1");
const autoTYpe2 = document.getElementById("autoType2");
const url = "https://trivia-mingle-api.onrender.com/api/v1/chat/score";
const { userName, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

score = localStorage.getItem("recentScore");

const Rcode = ["A", "9", "Z", 1, "M", 6];

if (score) {
  userScore.innerText = score + " Points";
} else {
  userScore.innerText = 0 + "  Point";
}

if (score < 300) {
  userScore.style.color = "#842029";
  autoTYpe1.style.color = "#FF8800";
  youLost.classList.remove("hidden");
  autoTYpe1.classList.remove("hidden");
  user = localStorage.getItem("name");
  autoTYpe1.innerHTML = `Sorry! ${userName}!!!...`;
} else {
  youWon.classList.remove("hidden");
  autoTYpe1.classList.remove("hidden");
  user = localStorage.getItem("name");
  autoTYpe2.innerHTML = `Congratulations! ${userName}!!!...`;
  let randomNumber = "";
  for (let i = 0; i < 4; i++) {
    randomNumber += Rcode[getRandomNumber()];
    console.log(randomNumber);
    code.textContent = `Code: ${randomNumber}`;
  }
  code.classList.remove("hidden");

  // const randomNumber = getRandomNumber()

  // push to Database
  const userData = {
    room,
    userName,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json({}))

    .then((data) => {
      nsole.log(data.err.keyPattern);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getRandomNumber() {
  return Math.floor(Math.random() * Rcode.length);
}

const endBtn = document.getElementById("end-btn");

endBtn.addEventListener("click", function () {
  localStorage.clear();
});
