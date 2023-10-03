// get all element

const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const city = document.getElementById("city");
const email = document.getElementById("email");
const password = document.getElementById("password");
const url = "https://trivia-mingle-api.onrender.com/api/v1/auth/register";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const formDataObject = {};

  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  //  send form to backend

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObject),
  })
    .then((response) => response.json({}))
    // console.log(response);
    .then((data) => {
      // document.getElementById("message").textContent = data.message;
      // Handle the response from the server.
      console.log(data.err.keyPattern);
    })
    .catch((error) => {
      //   console.log(error);
      // Handle errors.
    });
});
