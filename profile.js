const article = document.querySelector("main .container");

const url = "https://trivia-mingle-api.onrender.com/api/v1/auth";

const fetchUser = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const response = await fetch(
      `https://trivia-mingle-api.onrender.com/api/v1/auth/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const displayUser = (user) => {
  const firstName = user.user.firstName;
  const lastName = user.user.lastName;
  const userName = user.user.userName;
  const id = user.user._id;
  // console.log(userName);

  article.innerHTML = `<div class="card">
    <div class="profile-img-container">
      <img src="./image/home.jpg" alt="profile-hoto" class="img profile-photo" />
    </div>
    <div class="article">
      <div class="personal">
        <div class="form-row rows">
          <h5 class="profile-h5 h5 ph5">
            <span class="ps">welcome!!!</span> ${firstName} ${lastName}
          </h5>
        </div>
        <form action="#" class="form prof-form">
          <div class="form-row">
            <label for="community" class="form-label prof-leb">Mingle Zone</label>
            <select name="community" class="form-input select-input" id="community">
              <option value="Architecture">Architecture Zone</option>
              <option value="Catechism">Catechism Zone</option>
              <option value="Chemistry">Chemistry Zone</option>
              <option value="Geography">Geography Zone</option>
              <option value="Physics">Physics Zone</option>
            </select>
          </div>
          <button type="submit" class="btn btn-block bbt">Join Zone</button>
        </form>
      </div>
    </div>
  </div>`;

  const form = article.querySelector("form.form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const room = document.getElementById("community");
    const roomValue = room.value;
    window.location.href =
      `chat2.html?id=${id}&userName=${userName}&room=` +
      encodeURIComponent(roomValue);
  });
};

const start = async () => {
  const data = await fetchUser();
  displayUser(data);
};

start();
