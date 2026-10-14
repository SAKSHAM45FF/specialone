
/* CHANGE THE DATE HERE IF NEEDED */
const SPECIAL_DATE = "2025-10-15";


/* ELEMENTS */

const landing = document.getElementById("landing");
const celebrationPage = document.getElementById("celebrationPage");

const dateForm = document.getElementById("dateForm");
const dateInput = document.getElementById("specialDate");
const wrongMessage = document.getElementById("wrongMessage");

const openEnvelope = document.getElementById("openEnvelope");
const closeLetter = document.getElementById("closeLetter");
const letterModal = document.getElementById("letterModal");

const heartsLayer = document.getElementById("heartsLayer");

const photoInput = document.getElementById("photoInput");
const friendPhoto = document.getElementById("friendPhoto");


/* DATE UNLOCK */

dateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedDate = dateInput.value;

    if (!selectedDate) {
        showMessage("Choose our special date first, cutie ♡");
        return;
    }

    if (selectedDate !== SPECIAL_DATE) {
        showMessage("Awww, think once more... you remember this date! ♡");

        wrongMessage.style.animation = "none";
        void wrongMessage.offsetWidth;
        wrongMessage.style.animation = "shake 0.35s";

        return;
    }

    wrongMessage.textContent = "";

    landing.classList.add("hidden");
    celebrationPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    startCelebration();
});


function showMessage(message) {
    wrongMessage.textContent = message;
}


/* CELEBRATION ANIMATIONS */

let celebrationTimer = null;

function startCelebration() {
    createBalloons(18);
    createHearts(15);

    // Add a few new hearts and balloons over time.
    celebrationTimer = setInterval(function () {
        if (document.hidden) return;

        if (!celebrationPage.classList.contains("hidden")) {
            createHearts(2);
            createBalloons(1);
        }
    }, 3000);
}


function createBalloons(count) {
    const colors = [
        "#f5a9c4",
        "#e8b9e9",
        "#ffd1a8",
        "#c7b9f1",
        "#f7c5d6"
    ];

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement("span");

        balloon.className = "balloon";

        balloon.style.left = Math.random() * 100 + "%";

        balloon.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        balloon.style.setProperty(
            "--duration",
            (10 + Math.random() * 8) + "s"
        );

        balloon.style.animationDelay =
            (Math.random() * 2) + "s";

        document.body.appendChild(balloon);

        balloon.addEventListener("animationend", function () {
            balloon.remove();
        }, { once: true });
    }
}


function createHearts(count) {
    const symbols = ["♡", "♥", "✦", "✿"];

    for (let i = 0; i < count; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";

        heart.style.setProperty(
            "--duration",
            (6 + Math.random() * 5) + "s"
        );

        heart.style.animationDelay =
            (Math.random() * 1.5) + "s";

        heartsLayer.appendChild(heart);

        heart.addEventListener("animationend", function () {
            heart.remove();
        }, { once: true });
    }
}


/* OPEN FULL-SCREEN LETTER */

openEnvelope.addEventListener("click", function () {
    letterModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    createHearts(15);

    closeLetter.focus();
});


/* CLOSE LETTER */

function hideLetter() {
    letterModal.classList.add("hidden");

    document.body.style.overflow = "";

    openEnvelope.focus();
}


closeLetter.addEventListener("click", hideLetter);


// Clicking outside the paper also closes the letter.
letterModal.addEventListener("click", function (event) {
    if (event.target === letterModal) {
        hideLetter();
    }
});


// Escape key closes the letter.
document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        !letterModal.classList.contains("hidden")
    ) {
        hideLetter();
    }
});


/* PERSONAL PHOTO UPLOAD */

photoInput.addEventListener("change", function () {
    const file = photoInput.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please choose an image file.");
        photoInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        friendPhoto.src = reader.result;
    };

    reader.onerror = function () {
        alert("The photo could not be loaded. Please try again.");
    };

    reader.readAsDataURL(file);
});
