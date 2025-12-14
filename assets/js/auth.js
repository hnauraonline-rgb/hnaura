// ===== USER AUTH =====
const USER_KEY = "haura_user";

function register(){
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if(!name || !phone || !pass){
    alert("Fill all fields");
    return;
  }

  const user = { name, phone, pass };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  alert("Registered successfully");
}

function login(){
  const phone = document.getElementById("phone").value.trim();
  const pass = document.getElementById("pass").value.trim();

  const user = JSON.parse(localStorage.getItem(USER_KEY));
  if(!user || user.phone !== phone || user.pass !== pass){
    alert("Invalid login");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  location.href = "account.html";
}

function loadAccount(){
  if(localStorage.getItem("loggedIn") !== "true"){
    location.href = "login.html";
    return;
  }
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  if(!user) return;

  document.getElementById("uName").innerText = user.name;
  document.getElementById("uPhone").innerText = user.phone;
}

function logout(){
  localStorage.removeItem("loggedIn");
  location.href = "login.html";
}
