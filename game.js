
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level = 1;

var gameStart = 1;

//Function to create a automatic array next in sequence
function nextSequence() {
    userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  console.log(randomNumber);
  console.log(gamePattern);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);

  $("#level-title").text("Level " + level);
  level += 1;
}

//Function to check whether the game starts
$(document).keydown(function (event) {
  if (gameStart == 1) {
    gameStart = 0;
    nextSequence();
  }
});



//Function and event handling for clicking start button
$("#start-btn").on("click", function() {
  if(gameStart == 1){
    gameStart = 0;
    $("#start-btn").addClass("start-none");
    nextSequence();
  }
});

//Function to check which box is clicked
$(".btn").on("click", function (event) {
  if (gameStart == 0) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);

    playSound(userChosenColor);
    buttonAnimate(event.target);

    checkAnswer(userClickedPattern.length-1);
  }
  else{
    gameOver();
  }
});

//Palying sound Function
function playSound(sound) {
  var music = new Audio("./sounds/" + sound + ".mp3");
  music.play();
}

//Function to deal when the game is over
function gameOver()
{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 300);
    var music = new Audio("./sounds/wrong.mp3");
    music.play();
    gameStart=1;
    gamePattern=[];
    level = 1;
    $("#start-btn").removeClass("start-none");
}

//Button animation when the button is clicked
function buttonAnimate(button)
{
    $(button).addClass("pressed");

    setTimeout(function () {
      $(button).removeClass("pressed");
    }, 100);
}


//Funtion for checking the answer array
function checkAnswer(currentlevel)
{
    if(userClickedPattern[currentlevel] == gamePattern[currentlevel])
    {
        console.log("success");
        console.log(userClickedPattern.length +" "+ gamePattern.length);

        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        gameOver();
    }
}