var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

// random word chosen
var words = [
  "stapler",
  "paper",
  "desk",
  "pencil",
  "pen",
  "computer",
  "binder",
  "paperclip",
  "thumbtack",
  "divider",
  "tape"
];

var numberOfWins = 0;
var numberOfLosses = 0;

var numberOfGuesses;
var randomWord;
var randomWordLength;

var emptyDiv = document.getElementById("emptydiv");

resetGuesses();

document.onkeyup = function(event) {
// Saves user's guessed letter 
  var userInput = event.key;
  findIndices(userInput);

  var hasUnderscores = false;

  if (numberOfGuesses === 0) {
    loser();
  } else {
    var divChildren = emptyDiv.childNodes;

//If any underscores still remain when user runs out of guesses, hasUnderscores is set to true
    for (var i = 0; i < divChildren.length; i++) {
      if (divChildren[i].textContent === " _ ") {
        hasUnderscores = true;
      }
    }

//If there are no underscores left in word, then user has guess all letters correctly
    if (!hasUnderscores) {
      yay();
    }
  }
};

//Finds the indices of the letter in the word is it is corresponding to the guessed letter
function findIndices(userInput) {
  var indices = [];

//Create a list of the indices of the word to guess
  for (var i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === userInput) {
      indices.push(i);
    }
  }

//Save the number of guesses 
//If guess was incorrect a guess is subtracted, if correct then the letter appears in appropriate  positon in word
  if (indices.length === 0) {
    numberOfGuesses--;
    document.getElementById("guessesSpan").textContent = numberOfGuesses;
  } else {
    letterDisplay(userInput, indices);
  }
}

// If letter is in word, letter appears in appropriate space
function letterDisplay(userInput, indices) {
  var divChildren = emptyDiv.childNodes;

//Puts the user input on the screen if it is a correct letter
  for (var i = 0; i < indices.length; i++) {
    divChildren[indices[i]].textContent = userInput;
  }
}

// Alert "you win!" if word is completed, or "should tried harder" if guesses = 0
function yay() {
  alert("You win!");
  numberOfWins++;
  resetGuesses();
}

function loser() {
  alert("Lame...you should have tried harder...");
  numberOfLosses++;
  resetGuesses();
}

//Prepares for next game
function resetGuesses() {
  numberOfGuesses = 9;

//Resets guesses, displays running total of wins and losses
  document.getElementById("guessesSpan").textContent = numberOfGuesses;
  document.getElementById("winsSpan").textContent = numberOfWins;
  document.getElementById("lossesSpan").textContent = numberOfLosses;

//Picks a new word for next game, removes previous game's letters
  randomWord = words[Math.floor(Math.random() * words.length)];
  randomWordLength = randomWord.length;
  emptyDiv.innerHTML = "";

//Puts in new set of underscores for each letter in new word
  for (var i = 0; i < randomWordLength; i++) {
    var newSpan = document.createElement("span");
    newSpan.textContent = " _ ";
    emptyDiv.appendChild(newSpan);
  }
}
