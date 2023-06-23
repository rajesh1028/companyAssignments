import { alertMsg } from "../Scripts/components/alertmsg.component.js";

let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});

// login signup section

const url = "https://pocobackend.onrender.com"

const signups = document.querySelector("#signup_btn");

signups.addEventListener("click", signupfun);

async function signupfun(event) {
  try {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#pass").value;
    let age = document.querySelector("#age").value;
    let gender = document.querySelector("#gender").value;
    let phone = document.querySelector("#phone").value;
    let userObj = {
      name,
      email,
      password,
      age,
      gender,
      phone
    };

    let fetchData = await fetch(`${url}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(data.msg);
        if (data.msg == "registration sucessfull") {
          alertMsg(`${name} registered successfully`, "success");
          setTimeout(() => {
            window.location.href = "./loginsignup.html";
          }, 1000);
        } else if (data == "user already exists") {
          alertMsg(`${name} already exists`, "error");
          setTimeout(() => {
            window.location.href = "./loginsignup.html";
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  } catch (error) {
    alertMsg("Something went wrong.", "fail");
  }
}

// login=================//

const logins = document.querySelector("#login_btn");
logins.addEventListener("click", func);
async function func(event) {
  try {
    let email = document.querySelector("#login_email").value;
    let password = document.querySelector("#login_pass").value;
    let userObjs = {
      email,
      password,
    };
    if (email == "onlyadmin@gmail.com" && pass == "admin1234") {
      window.location.href = "admin.html";
    } else {
      // console.log(userObjs);
      let loginSys = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObjs),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)

          if (data.msg == "logged in successfully") {
            alertMsg(`logged in successfully`, "success");
            localStorage.setItem("user", data.id);
            localStorage.setItem("user_name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("token", data.normaltoken);
            
            setTimeout(() => {
              window.location.href = "./index.html";
            }, 3000);
            console.log(data);
          } else {
            alertMsg(`${data.msg}`, "error");
          }
        })
        .catch((err) => console.log(err));
    }
  } catch (error) {
    alert("Something went wrong. Please try again later.");
  }
}
