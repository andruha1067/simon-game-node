var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

// User methods
// mouse click event listener
var userClickedPattern = [];
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// keydown event listener
var firstKeyPress = true;
$(document).keydown(function(){
    if (firstKeyPress) {
      nextSequence();
      firstKeyPress = false;
    }
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Utility Methods
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  // Visual and sound effects
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  firstKeyPress = true;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Good so far");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  } else {
      $("body").addClass("game-over");
      setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      playSound("wrong");

      startOver();
  }
}
