// ================= TIME (LIVE CLOCK) =================
function updateTime() {
    const timeElement = document.getElementById("time");
    if (!timeElement) return;

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    minutes = minutes < 10 ? "0" + minutes : minutes;

    timeElement.textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

//====================BATTERY STATUS=====================
navigator.getBattery().then(function(battery) {

    function updateBattery() {
        let level = Math.round(battery.level * 100);
        document.getElementById("battery").textContent = "🔋 " + level + "%";
    }

    updateBattery();

    battery.addEventListener("levelchange", updateBattery);
});

// ================= PAGE ELEMENTS =================
const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const otpPage = document.getElementById("verifyPage");


// ================= SAFE PAGE SWITCH HELPERS =================
function showPage(pageToShow) {
    [loginPage, signupPage, otpPage].forEach(p => {
        if (p) p.classList.remove("active");
    });

    if (pageToShow) pageToShow.classList.add("active");
}


// ================= NAVIGATION =================

// Login → Signup
document.getElementById("goSignupLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(signupPage);
});

// Signup → Login
document.getElementById("goLoginLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(loginPage);
});


// ================= SIGNUP → OTP =================
document.getElementById("signupBtn")?.addEventListener("click", () => {
    showPage(otpPage);
    generateOTP();
    startTimer();
});


// ================= OTP SYSTEM =================
let otpCode = "";

// generate OTP
function generateOTP() {
    otpCode = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP:", otpCode); // testing only
}


// ================= OTP INPUTS =================
const inputs = document.querySelectorAll(".otp-box");

inputs.forEach((box, i) => {

    box.addEventListener("input", () => {
        if (box.value && i < inputs.length - 1) {
            inputs[i + 1].focus();
        }
    });

    box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !box.value && i > 0) {
            inputs[i - 1].focus();
        }
    });
});


// ================= VERIFY OTP =================
document.getElementById("verifyBtn")?.addEventListener("click", () => {

    let entered = "";
    inputs.forEach(i => entered += i.value);

    const msg = document.getElementById("verifyMessage");

    if (entered.length !== 6) {
        msg.textContent = "⚠️ Enter full 6-digit OTP";
        msg.style.color = "orange";
        return;
    }

    if (entered == otpCode) {
        msg.textContent = "✅ Verified successfully!";
        msg.style.color = "green";
    } else {
        msg.textContent = "❌ Wrong OTP";
        msg.style.color = "red";
    }
});


// ================= TIMER (25 SEC RESEND) =================
let timeLeft = 25;
let timerInterval;

function startTimer() {
    const timer = document.getElementById("timer");
    const resendBtn = document.getElementById("resendBtn");
    const resendText = document.getElementById("resendText");

    if (!timer || !resendBtn || !resendText) return;

    timeLeft = 25;

    resendBtn.style.display = "none";
    resendText.style.display = "inline";

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            resendText.style.display = "none";
            resendBtn.style.display = "inline-block";
        }
    }, 1000);
}


// ================= RESEND OTP =================
document.getElementById("resendBtn")?.addEventListener("click", () => {
    generateOTP();
    startTimer();
});

// ================= STEP 1 =================
function getLocation() {

    const input = document.getElementById("location");

    if (navigator.geolocation) {

        input.value = "Getting location...";

        navigator.geolocation.getCurrentPosition(
            function(position) {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                input.value = `Lat: ${lat}, Lng: ${lng}`;

                // optional: open map
                console.log(lat, lng);

            },
            function() {
                input.value = "Location access denied";
            }
        );

    } else {
        input.value = "Geolocation not supported";
    }
}
