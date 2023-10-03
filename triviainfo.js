const { userName, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Get name
const userName1 = document.getElementById("user-name");
const user = localStorage.getItem("name");
userName1.innerText = `${userName}!!`;

const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

const link = document.querySelector(".btn-link");

link.addEventListener("click", function (e) {
  window.location.href = `./game.html?userName=${userName}&room=${room}`;
});
