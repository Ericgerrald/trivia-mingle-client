// Uers Links
const userBtn = document.getElementById("userBtn");
const links = document.getElementById("links");
// const scoreBtn = document.getElementById("scoreBtn");
// const highScore = document.querySelector(".high-scores");
const url = "https://trivia-mingle-api.onrender.com/api/v1/chat";

document.addEventListener("click", function (event) {
  const isClickInsideNavbar = links.contains(event.target);
  const isClickInsideToggleButton = userBtn.contains(event.target);
  // const isClickhighScore = highScore.contains(event.target);
  // const isClickscoreBtn = scoreBtn.contains(event.target);
  if (!isClickInsideNavbar && !isClickInsideToggleButton) {
    links.classList.remove("show-nav-users");
  }
});

userBtn.addEventListener("click", () => {
  links.classList.toggle("show-nav-users");
});

// scoreBtn.addEventListener("click", () => {
//   // highScore.classList.toggle("show-high-scores");
// });

//============================ Data Base =====================

// ==Get username and room from url
const { userName, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const form = document.getElementById("form");
// const msg = document.getElementById("msg");
const messageInput = document.getElementById("messageInput");
const chatMessageDiv = document.querySelector(".seeMessage");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("links");
// const chatter = document.querySelector(".chatter");
// console.log(form);

// ES modules
// import { io } from "socket.io-client";

const socket = io("https://trivia-mingle-api.onrender.com");

// join chatRoom
socket.emit("joinRoom", { userName, room });

// get room users
socket.on("roomUsers", ({ room, users }) => {
  outPutRoomName(room);
  outPutUsers(users);
});

// Message from server
socket.on("message", (message) => {
  // console.log(message);
  outputMessage(message);

  chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
});

// message submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Start of send message to data base
  const msg = messageInput.value;
  const message = msg;
  const user = userName;
  const community = room;

  const Fdata = {
    message,
    user,
    community,
  };

  try {
    const resp = await fetch(
      "https://trivia-mingle-api.onrender.com/api/v1/chat/message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Fdata),
      }
    );
    if (!resp.ok) {
      throw new Error("Failed to send data to server");
    }
    // emit messaget to server
    if (msg.trim() !== "") {
      socket.emit("chatMessage", msg);
      // clear message
      messageInput.value = "";
      messageInput.focus();
    }
    // const data = await resp.json({});
  } catch (error) {
    console.log(error);
  }
  // console.log(data);

  // end of send message to database

  // emit messaget to server
  // if (msg.trim() !== "") {
  //   socket.emit("chatMessage", msg);
  //   // clear message
  //   messageInput.value = "";
  //   messageInput.focus();
  // }
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message-mm");
  div.classList.add("others");
  if (message.userName === "Admin") {
    div.innerHTML = `<div class="message message-app">
            <p class="text textp">${message.text}</p>
            <p class="meta meta-t">${message.time}</p>
          </div>`;
    document.querySelector(".seeMessage").appendChild(div);
  } else if (
    message.userName != "Admin" &&
    message.userName === `${userName}`
  ) {
    console.log("Hi");
    div.classList.remove("others");
    div.classList.add("she");
    div.innerHTML = `
              <div class="message message-self">
                <p class="text">${message.text}</p>
                <p class="meta meta-t">${message.time}</p>
              </div>
            `;
    document.querySelector(".seeMessage").appendChild(div);
  } else {
    div.innerHTML = `<p class="meta">${message.userName}<span></p>
              <div class="message">
                <p class="text textp">
                  ${message.text}
                </p>
                <p class="meta meta-t">${message.time}</p>`;
    document.querySelector(".seeMessage").appendChild(div);
  }
}

// add room name to Dom
function outPutRoomName(room) {
  roomName.innerText = room;
}

// Out put users to dom
function outPutUsers(users) {
  userList.innerHTML = `
${users.map((user) => `<li>${user.userName}</li>`).join("")}`;
}

// move to game Page
const gameBtn = document.getElementById("btn-game");

gameBtn.addEventListener("click", () => {
  window.location.href = `./gameIntro.html?userName=${userName}&room=${room}`;
});
