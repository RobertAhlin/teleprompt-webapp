let textElement = document.getElementById("text");
let editor = document.getElementById("editor");
let displayHeight = document.getElementById("display");
let textSizeSlider = document.getElementById("textSize");
let textSizeInput = document.getElementById("textSizeInput");
let speedSlider = document.getElementById("speed");
let speedInput = document.getElementById("speedInput");
let themeSelector = document.getElementById("themeSelector");
let container = document.getElementById("container");

let scrollSpeed = 5;
let scrollInterval;
let position = 0;
let isScrolling = false;

// Uppdatera display med redigerad text
editor.addEventListener("input", function () {
    textElement.innerText = editor.value;
});

// Placeholder-textfunktion för editorn
editor.addEventListener("focus", function () {
    if (editor.value === "Write your text here...") {
        editor.value = "";
        editor.style.color = "#000"; // Normal textfärg
    }
});

editor.addEventListener("blur", function () {
    if (editor.value.trim() === "") {
        editor.value = "Write your text here...";
        editor.style.color = "#aaa"; // Gör placeholder-texten grå
    }
});

// Initiera placeholder korrekt vid sidladdning
if (editor.value.trim() === "") {
    editor.value = "Write your text here...";
    editor.style.color = "#aaa";
}

// Starta scrollning
function startScroll() {
    if (isScrolling) return;

    textElement.innerText = editor.value; // Uppdatera texten från editorn

    // Om position är noll eller text har försvunnit helt — återställ
    if (position <= -textElement.scrollHeight || position === 0) {
        position = displayHeight.clientHeight / 2;
        textElement.style.transform = `translateY(${position}px)`;
    }

    isScrolling = true;

    scrollInterval = setInterval(() => {
        position -= scrollSpeed * 0.1;
        textElement.style.transform = `translateY(${position}px)`;

        // Stoppa scroll om texten har scrollat ur bild
        if (position <= -textElement.scrollHeight) {
            pauseScroll();
        }
    }, 20);
}

// Pausa scrollningen
function pauseScroll() {
    clearInterval(scrollInterval);
    isScrolling = false;
}

// Stoppa och återställ scrollningen
function resetScroll() {
    clearInterval(scrollInterval);
    isScrolling = false;
    position = displayHeight.clientHeight / 2;
    textElement.style.transform = `translateY(${position}px)`;
}

// Justera textstorlek
function adjustTextSize(value) {
    textElement.style.fontSize = value + "px";
    textSizeSlider.value = value;
    textSizeInput.value = value;
}

textSizeSlider.addEventListener("input", function () {
    adjustTextSize(this.value);
});
textSizeInput.addEventListener("input", function () {
    adjustTextSize(this.value);
});

// Justera scrollhastighet
function adjustSpeed(value) {
    scrollSpeed = parseInt(value);
    speedSlider.value = value;
    speedInput.value = value;
}

speedSlider.addEventListener("input", function () {
    adjustSpeed(this.value);
});
speedInput.addEventListener("input", function () {
    adjustSpeed(this.value);
});

// Ändra tema och spara valet i `localStorage`
themeSelector.addEventListener("change", function () {
    document.body.className = this.value;
    localStorage.setItem("selectedTheme", this.value);
});

// Ladda sparat tema vid sidladdning
let savedTheme = localStorage.getItem("selectedTheme");
if (savedTheme) {
    document.body.className = savedTheme;
    themeSelector.value = savedTheme;
} else {
    document.body.className = "dark";
    themeSelector.value = "dark";
}

// Initiera värden
adjustTextSize(textSizeSlider.value);
adjustSpeed(speedSlider.value);
position = displayHeight.clientHeight / 2;
textElement.style.transform = `translateY(${position}px)`;
