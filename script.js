let textElement = document.getElementById("text");
let editor = document.getElementById("editor");
let displayHeight = document.getElementById("display");
let textSizeSlider = document.getElementById("textSize");
let textSizeInput = document.getElementById("textSizeInput");
let speedSlider = document.getElementById("speed");
let speedInput = document.getElementById("speedInput");
let displayHeightSlider = document.getElementById("displayHeight");
let displayHeightInput = document.getElementById("displayHeightInput");
let themeSelector = document.getElementById("themeSelector");
let positionSelector = document.getElementById("positionSelector");
let container = document.getElementById("container");

let scrollSpeed = 5;
let scrollInterval;
let position = 0;
let isScrolling = false;

// Uppdatera display med redigerad text
editor.addEventListener("input", function() {
    textElement.innerText = editor.value;
});

positionSelector.addEventListener("change", function () {
    updatePosition(this.value);
});

function updatePosition(position) {
    // Ta bort tidigare positioneringsklasser
    container.classList.remove(
        "top-left", "top-center", "top-right",
        "bottom-left", "bottom-center", "bottom-right"
    );
    container.classList.add(position);
}

// Starta scrollning
function startScroll() {
    if (isScrolling) return;

    // Uppdatera texten från editorn (ifall den ändrats)
    textElement.innerText = editor.value;

    // Om position är noll (dvs. aldrig startat) eller text har försvunnit helt — återställ
    if (position <= -textElement.scrollHeight || position === 0) {
        position = displayHeight.clientHeight / 2;
        textElement.style.transform = `translateY(${position}px)`;
    }

    isScrolling = true;

    scrollInterval = setInterval(() => {
        position -= scrollSpeed * 0.1;
        textElement.style.transform = `translateY(${position}px)`;

        // Om texten har scrollat helt ur bild – stoppa scrollen automatiskt
        if (position <= -textElement.scrollHeight) {
            pauseScroll(); // eller resetScroll() om du vill börja om direkt
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

textSizeSlider.addEventListener("input", function() {
    adjustTextSize(this.value);
});
textSizeInput.addEventListener("input", function() {
    adjustTextSize(this.value);
});

// Justera scrollhastighet
function adjustSpeed(value) {
    scrollSpeed = parseInt(value);
    speedSlider.value = value;
    speedInput.value = value;
}

speedSlider.addEventListener("input", function() {
    adjustSpeed(this.value);
});
speedInput.addEventListener("input", function() {
    adjustSpeed(this.value);
});

// Justera visningshöjd
function adjustDisplayHeight(value) {
    displayHeight.style.height = value + "px";
    displayHeightSlider.value = value;
    displayHeightInput.value = value;
}

displayHeightSlider.addEventListener("input", function() {
    adjustDisplayHeight(this.value);
});
displayHeightInput.addEventListener("input", function() {
    adjustDisplayHeight(this.value);
});

// Ändra tema
themeSelector.addEventListener("change", function() {
    document.body.className = this.value;
});

// Initiera värden
adjustTextSize(textSizeSlider.value);
adjustSpeed(speedSlider.value);
adjustDisplayHeight(displayHeightSlider.value);
textElement.innerText = editor.value;
position = displayHeight.clientHeight / 2;
textElement.style.transform = `translateY(${position}px)`;

updatePosition(positionSelector.value);