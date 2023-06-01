// create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
let buttonColours = ["red", "blue", "green", "yellow"];

// create a new empty array called gamePattern
let gamePattern = [];

// create a new empty array with the name userClickedPattern
let userClickedPattern = [];

function nextSquare() {
    // create a random number between 0 and 3
    let randomNumber = Math.floor(Math.random() * 4);

    // Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    let randomChosenColour = buttonColours[randomNumber];

    // Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    gamePattern.push(randomChosenColour);
    
}

// Use jQuery to select the button with the same id as the randomChosenColour
// Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// use Javascript to play the sound for the button colour selected in step 1
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    let userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    // In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColour);

    // animatePress() to animate the press on the button that is clicked
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
$(document).keypress(function() {
    if (gamePattern.length === 0) {
        nextSquare();
        $("#level-title").text("Level 1");
        playSound(gamePattern[gamePattern.length-1]);
        animatePress(gamePattern[gamePattern.length-1]);
    }
});

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
                nextSquare();
                $("#level-title").text("Level " + gamePattern.length);
                playSound(gamePattern[gamePattern.length-1]);
                animatePress(gamePattern[gamePattern.length-1]);
            }, 1000);
        }
    } else {
        // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

// Create a new function called startOver().
function startOver() {
    // Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}

