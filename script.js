// TIME (live clock)
function updateTime() {
    const timeElement = document.getElementById("time");

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    minutes = minutes < 10 ? "0" + minutes : minutes;

    timeElement.textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();


//BUTTON changing pages
const btn = document.getElementById("report-btn");
const home = document.getElementById("home");
const loginPage = document.getElementById("loginPage");

btn.addEventListener("click", () => {
    home.classList.remove("active");
    loginPage.classList.add("active");
});
