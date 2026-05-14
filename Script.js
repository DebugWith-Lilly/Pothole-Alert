const container = document.querySelector(".container");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

showRegister.addEventListener("click", () => {
    container.classList.add("active");
});

showLogin.addEventListener("click", () => {
    container.classList.remove("active");
});
