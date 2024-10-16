// 3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var level = 0;
var startedToToggle = false;
var userClickedPattern = [];
var gamePattern = [];
$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
  var userLastInput = userClickedPattern.length - 1;
  checkAnswer(userLastInput);
});
// 1. Inside game.js create a new function called nextSequence()
function nextSequence() {
  $("h1").text("Level " + level);
  level++;

  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(200)
    .fadeOut(200)
    .fadeIn(200);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// 1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).on("keydown", function () {
  if (!startedToToggle) {
    $("h1").text("Level " + level);
    nextSequence();
    startedToToggle = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

      userClickedPattern = [];
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    $("h1").text("Game over. Press any Key to Restart.");
  }
}
