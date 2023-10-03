const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const url = "https://trivia-mingle-api.onrender.com/api/v1/auth/login";
const loginA = document.querySelector(".loginA");
// console.log(form);
// console.log(form);
// console.log(email);
// console.log(password);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginUser();
});

const loginUser = async () => {
  const formData = new FormData(form);
  // converting form data to object
  const userData = {};
  formData.forEach((value, key) => {
    userData[key] = value;
  });
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await resp.json({});
    // console.log(data);
    if (data.user) {
      const id = data.user.id;
      window.location.href = `/profile.html?id=${id}`;
      // console.log(data.user.id);
    }

    if (data.msg) {
      loginA.classList.add("loginB");
    }
    if (!data.msg) {
      loginA.classList.remove("loginB");
    }
  } catch (error) {
    console.log(error);
  }
};
