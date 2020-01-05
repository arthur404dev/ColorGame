var gameMode = 9;
var colorArr = createArray();
var tile = document.querySelectorAll(".tile");
var pickRandom = pickRandomColor();
var displayColor = document.querySelector(".displayRGB");
var title = document.querySelector(".title");
var sysMsg = document.querySelector(".systemMsg");
var buttons = document.querySelectorAll(".btnGameMode");
var btnReset = document.querySelector(".btnReset");
var chosenColor = colorArr[pickRandom];
var selectedColor = document.querySelector(".selected");
var btnFont = document.querySelectorAll("button");

runGame();
btnReset.addEventListener("click", function() {
  resetGame(gameMode);
});

// * Hover Visual Effect
for (var i = 0; i < btnFont.length; i++) {
  btnFont[i].addEventListener("mouseover", function() {
    this.classList.add("hovered");
  });
  btnFont[i].addEventListener("mouseout", function() {
    this.classList.remove("hovered");
  });
}

function runGame() {
  // * Display Chosen Color

  displayColor.textContent = chosenColor;
  // * Assign each color from colorArr to tile
  for (var i = 0; i < tile.length; i++) {
    tile[i].style.backgroundColor = colorArr[i];
    // * Create Listeners to each tile
    tile[i].addEventListener("click", function() {
      if (this.style.backgroundColor === chosenColor) {
        title.style.backgroundColor = this.style.backgroundColor;
        colorAll();
        sysMsg.textContent = "Congratulations!";
      } else {
        this.style.backgroundColor = "#232323";
        sysMsg.textContent = "Try Again!";
      }
    });
  }
}

// * Pick Random New Color from Array

function pickRandomColor() {
  return Math.floor(Math.random() * colorArr.length);
}

// * Random Color Generator

function generateRGB() {
  var R = Math.floor(Math.random() * 256);
  var G = Math.floor(Math.random() * 256);
  var B = Math.floor(Math.random() * 256);

  return "rgb(" + R + ", " + G + ", " + B + ")";
}

// * Generate Random Colors

function createArray() {
  // Create Array
  var arrayColors = [];
  // Push Colors into Array
  for (var i = 0; i < gameMode; i++) {
    arrayColors.push(generateRGB());
  }
  // Return Array
  return arrayColors;
}

// * Color All Tiles

function colorAll() {
  for (var i = 0; i < colorArr.length; i++) {
    tile[i].style.backgroundColor = chosenColor;
  }
  document.documentElement.style.setProperty("--main-color", chosenColor);
  document.documentElement.style.setProperty("--contrast-color", "whitesmoke");
  btnReset.textContent = "Play Again?";
}

// * Game Modes
// Create Listeners for Buttons
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var mode = Number(this.id);
    // Easy Button Template
    gameMode = mode;
    removeSelected();
    document.getElementById(mode).classList.add("selected");
    resetGame(mode);
  });
}

// * Remove Selected from Buttons
function removeSelected() {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
  }
}
// * Reset Function
function resetGame(a) {
  gameMode = a;
  createArray();
  pickRandomColor();
  colorArr = createArray();
  pickRandom = pickRandomColor();
  chosenColor = colorArr[pickRandom];
  title.style.backgroundColor = "var(--main-color)";
  document.documentElement.style.setProperty("--main-color", "#9b2335");
  document.documentElement.style.setProperty("--contrast-color", "whitesmoke");
  sysMsg.textContent = "";
  btnReset.textContent = "Randomize Colors";

  for (var i = 1; i < tile.length; i++) {
    if (colorArr[i]) {
      tile[i].style.display = "block";
      tile[i].style.backgroundColor = colorArr[i];
    } else {
      tile[i].style.display = "none";
    }
  }

  runGame();
}
