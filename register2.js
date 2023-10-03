// get all element
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const city = document.getElementById("city");
const email = document.getElementById("email");
const emailA = document.querySelector(".emailA");
const userNameA = document.querySelector(".userNameA");
const password = document.getElementById("password");
const url = "https://trivia-mingle-api.onrender.com/api/v1/auth/register";

// console.log(emailA);

form.addEventListener("submit", async (e) => {
  // prevent default
  e.preventDefault();
  registerUser();

  // getting the form data
  // const formData = new FormData(e.target);

  // converting form data to object
  // const userData = {};
  // formData.forEach((value, key) => {
  //   userData[key] = value;
  // });
});

// register user

const registerUser = async () => {
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
    // console.log(data.user);
    if (data.user) {
      const id = data.user.id;
      window.location.href = `/profile.html?id=${id}`;
      // console.log(data.user.id);
    }
    if (data.err.keyPattern.email) {
      // console.log("hi");
      emailA.classList.add("emailB");
    }
    if (!data.err.keyPattern.email) {
      // console.log("hi");
      emailA.classList.remove("emailB");
    }

    if (data.err.keyPattern.userName) {
      userNameA.classList.add("userNameB");
    }
    if (!data.err.keyPattern.userName) {
      userNameA.classList.remove("userNameB");
    }

    // console.log(data.err.keyPattern);
  } catch (error) {}
};

// const getFormData = () => {
//   // getting the form data
//   const formData = new FormData(form);
//   // converting form data to object
//   const userData = {};
//   formData.forEach((value, key) => {
//     userData[key] = value;
//   });
// };

// try {
//   // making a post request
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
//   console.log(response);
//   console.log(response.error);
//   // console.log(body);
// } catch (error) {
//   // console.log(error);
// }
