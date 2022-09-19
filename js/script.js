const guessedLettersOutput = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "lucky";
const guessedLetters = [];

/*Create placeholders for letters of word*/

const blankWord = function (word) {
    /*the letters of the word become an array*/
    const blankWordLetters = [];
    /*loop through the array and return a dot for each letter*/
    for (const character of word) {
        console.log(character);
        blankWordLetters.push("●");
    }
    /*.join("") to separate the objects in the array by one space*/
    wordInProgress.innerText = blankWordLetters.join("");
};

blankWord(word);

/*A click of the button will clear the input field*/

guessButton.addEventListener("click", function (e) {
    /*prevent default behavior of clicking a button, the form submitting, and the page reloading*/
    e.preventDefault();
    /*clear the message*/
    message.innerText = "";
    
    /*grab the player's letter*/
    const letterInput = letter.value;
   
    /*grab the player's letter after it has been checked*/
    const inputChecked = checkInput(letterInput);
       
    /*if input letter passess all checks, return the letter (as a variable to the makeGuess function)*/
    if (inputChecked) {
        makeGuess(letterInput);
    };

    /*clear the input box*/
    letter.value = "";

    
});

/*Check the player's input*/

const checkInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please guess a letter.";
    }
    else if (input.length > 1){
        message.innerText = "Only guess one letter silly!";
    }
    else if (!input.match(acceptedLetter)){
        message.innerText = "Hmm, try again.";
    }
    else {
        message.innerText = "You guessed a letter!";
        return input;
    };
};

const makeGuess = function (letterInput) {
    letterInput = letterInput.toUpperCase();

    if (guessedLetters.includes(letterInput)) {
        message.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(letterInput);
        console.log(guessedLetters);
    }

};


