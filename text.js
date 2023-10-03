fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
})
  .then((response) => {
    if (response.ok) {
      // HTTP status code 200-299 indicates success
      return response.json();
    } else {
      // Handle error responses based on the status code
      if (response.status === 400) {
        // Handle a specific status code (e.g., Bad Request)
        return response.json().then((errorData) => {
          console.error("Bad Request:", errorData.message);
          throw new Error("Bad Request: " + errorData.message);
        });
      } else if (response.status === 401) {
        // Handle unauthorized error
        // Redirect to login page or show an error message
        // ...
      } else {
        // Handle other error status codes
        console.error("Server Error:", response.status);
        throw new Error("Server Error");
      }
    }
  })
  .then((data) => {
    // Handle the successful response data
    console.log("Success:", data);
    // Redirect or update the UI as needed
  })
  .catch((error) => {
    // Handle exceptions and network errors
    console.error("An error occurred:", error);
    // Show a generic error message to the user
  });

// new
try {
  // making a post request
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    // Data was successfully posted
    window.location.href = "/profile.html"; // Redirect to success page
  }
  // else {
  //   // Handle error responses based on the status code
  //   if (response.status === 400) {
  //     // Handle a specific status code (e.g., Bad Request)
  //     return response.json().then((errorData) => {
  //       console.error("Bad Request:", errorData.message);
  //       throw new Error("Bad Request: " + errorData.message);
  //     });
  //   } else if (response.status === 401) {
  //     // Handle unauthorized error
  //     // Redirect to login page or show an error message
  //     // ...
  //   } else {
  //     // Handle other error status codes
  //     console.error("Server Error:", response.status);
  //     throw new Error("Server Error");
  //   }
  // }
  else {
    if (response.status === 500) {
      alert("An error occurred: " + errorResponse.message);
    }
    // Handle error responses
    // const errorResponse = await response.json(); // Parse the error response
    // console.error("Error posting data:", errorResponse.message);
    // alert("An error occurred: " + errorResponse.message); // Display server error in an alert
  }
} catch (error) {
  console.error("An error occurred:", error);
  alert("An error occurred. Please try again."); // Display a generic error in an alert
}

// else if (data.err.keyPattern.email) {
//       // console.log("hi");
//       emailA.classList.add("emailB");
//     }
//     else (data.err.keyPattern.userName) {
//       // console.log("hi");
//       emailA.classList.add("userNameB");
//     }


// Article
<div class="card">
          <!-- <div class="top-btn">
            <a href="#" class="btn">Logout</a>
            <a href="#" class="btn">Edit</a>
          </div> -->
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
                <label for="name" class="form-label profile-label"
                  >Username</label
                >
                <h5 class="profile-h5 h5">Nwaru Victor</h5>
              </div>
              <!-- start -->
              <!-- start -->
              <div class="form-row rows">
                <label for="city" class="form-label profile-label">city</label>
                <h5 class="profile-h5">Port Harcourt</h5>
              </div>
              <!-- start -->
              <!-- start -->
              <div class="form-row rows">
                <label for="email" class="form-label profile-label"
                  >email</label
                >
                <h5 class="profile-h5 mail-h5">gerrald@yahoo.com</h5>
              </div>
              <!-- start -->
              <div class="underline"></div>
            </div>
            <div class="game-profile">
              <h5 class="hp">High Scores</h5>
              <div class="form-row row">
                <h5 class="profile-h5 p5">
                  Architecture Trivia: <span class="s">100</span> pts
                </h5>
              </div>
              <div class="form-row row">
                <h5 class="profile-h5 p5">
                  Catechism Trivia: <span class="s">80</span> pts
                </h5>
              </div>
              <div class="form-row row">
                <h5 class="profile-h5 p5">
                  Chemistry Trivia: <span class="s">60</span> pts
                </h5>
              </div>
              <div class="form-row row">
                <h5 class="profile-h5 p5">
                  Geography Trivia: <span class="s">20</span> pts
                </h5>
              </div>
              <div class="form-row row">
                <h5 class="profile-h5 p5">
                  Physics Trivia: <span class="s">90</span> pts
                </h5>
              </div>
            </div>
          </div>
          <div class="underline"></div>
          <div class="ranks">
            <!-- <h5 class="profile-h5 hp">PROGRESS</h5> -->
            <div class="profile-stars">
              <div class="fa-div">
                <span
                  ><i class="fa-sharp fa-solid fa-star empty-star"></i
                ></span>
              </div>
              <div class="fa-div">
                <span
                  ><i class="fa-sharp fa-solid fa-star empty-star"></i
                ></span>
              </div>
              <div class="fa-div">
                <span
                  ><i class="fa-sharp fa-solid fa-star empty-star"></i
                ></span>
              </div>
              <div class="fa-div">
                <span
                  ><i class="fa-sharp fa-solid fa-star empty-star"></i
                ></span>
              </div>
              <div class="fa-div">
                <span
                  ><i class="fa-sharp fa-solid fa-star empty-star"></i
                ></span>
              </div>
            </div>
          </div>
          <div class="underline"></div>
          <div class="profile-footer">
            <div class="a-chart">
              <a href="#" class="btn pb">Trivia</a>
            </div>
            <div class="a-chart">
              <a href="#" class="btn pb">Mingle</a>
            </div>
          </div>
        </div>


 