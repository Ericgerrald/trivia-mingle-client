const article = document.querySelector(".container");
// console.log(article);
const url = "http://localhost:3000/api/v1/auth";

const fetchUser = async () => {
  try {
    // console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // console.log(id);
    const response = await fetch(`http://localhost:3000/api/v1/auth/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const displayUser = (user) => {
  // console.log(user);
  const firstName = user.user.firstName;
  const lastName = user.user.lastName;
  const id = user.user._id;
  // console.log(id);
  // const names = user.user;
  // const { archiScore, cateSchor, chemScore, city, email, userNmae } = names;

  article.innerHTML = `<div class="card">
          <div class="profile-img-container">
            <img
              src="./image/home.jpg"
              alt="profile-hoto"
              class="img profile-photo"
            />
          </div>
          <div class="article">
            <div class="personal">
              <!-- start -->
              <div class="form-row rows">
                <h5 class="profile-h5 h5 ph5">
                  <span class="ps">welcome!!!</span> ${firstName} ${lastName}
                </h5>
              </div>
              <!-- end -->
              <form action="" id="formID-${id}" class="form prof-form">
                <!-- start of item -->
                <div class="form-row">
                  <label for="community" class="form-label prof-leb"
                    >Mingle Zone</label
                  >
                  <select
                    name="community"
                    class="form-input select-input"
                    id="community"
                  >
                    <option value="Architecture">Architecture Zone</option>
                    <option value="Catechism">Catechism Zone</option>
                    <option value="Chemistry">Chemistry Zone</option>
                    <option value="Geography">Geography Zone</option>
                    <option value="Physics">Physics Zone</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-block bbt">
                  Join Zone
                </button>
                <!-- end of item -->
              </form>
            </div>
          </div>
        </div>`;

  const formID = document.getElementById(`formID-${id}`);
  formID.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = `chat.html?id=${id}`;
  });

  console.log(formID);
};

const start = async () => {
  const data = await fetchUser();
  displayUser(data);
};

start();

// ==================Html
// message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // scroll down

  // chatMessageDiv.scrollTop = chatter.scrollHeight;
  chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
});

// message form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // get message text value
  // const msgValue = msg.value;
  const msg = e.target.elements.msg.value;

  // send message to data base

  // emit message to server
  socket.emit("chatMessage", msg);

  // clear form
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// output message to Dom Other people message
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message-mm");
  div.classList.add("others");
  if (message.userName === "Admin") {
    div.innerHTML = `<div class="message message-app">
            <p class="text textp">${message.text}</p>
            <p class="meta meta-t">${message.time}</p>
          </div>`;
    document.querySelector(".chat-main").appendChild(div);
  } else {
    div.innerHTML = `<p class="meta">${message.userName}<span></p>
              <div class="message">
                <p class="text textp">
                  ${message.text}
                </p>
                <p class="meta meta-t">${message.time}</p>`;
    document.querySelector(".chat-main").appendChild(div);
  }
  // div.innerHTML = `<p class="meta">${message.userName}<span></p>
  //             <div class="message">
  //               <p class="text">
  //                 ${message.text}
  //               </p>
  //               <p class="meta meta-t">${message.time}</p>`;
  // document.querySelector(".chat-main").appendChild(div);

  // chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
  // if(chatMessageDiv.)
  // chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
}

// =========
// document.addEventListener("DOMContentLoaded", function () {
//   // Replace with your element's ID
//   const scrollHeight = chatMessageDiv.scrollTop;
//   console.log("Scroll Height:", scrollHeight);
// });

// window.addEventListener("scroll", function () {
//   console.log("hello");
// });
