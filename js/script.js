const guessedLettersOutput = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingStatement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "lucky";
const guessedLetters = [];
let remainingGuesses = 8;


/*parse API of words*/
const getWord = async function () {
    const request = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    /*make list of words into an array - indicate split at line break*/
    const wordArray = words.split("\n");
    /*variable to represent random word*/
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    /*the word variable is now random and whitespace is removed*/
    word = wordArray[randomIndex].trim();
    /*call the placeholder function and pass it the random word*/
    blankWord(word);
};


/*Create placeholders for letters of word*/
const blankWord = function (word) {
    /*the letters of the word become an array*/
    const blankWordLetters = [];
    /*loop through the array and return a dot for each letter*/
    for (const character of word) {
        //console.log(character);
        blankWordLetters.push("●");
    }
    /*.join("") to separate the objects in the array by one space*/
    wordInProgress.innerText = blankWordLetters.join("");
};

getWord();



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


/*Add the users guess to an array*/
const makeGuess = function (letterInput) {
    letterInput = letterInput.toUpperCase();
        /*Check that the users input is not already in the array*/
    if (guessedLetters.includes(letterInput)) {
        message.innerText = "You already guessed that letter. Try again.";
    } else {
        /*add the checked letter to the end of the array and log out the array*/
        guessedLetters.push(letterInput);
        console.log(guessedLetters);
        showGuessedLetters();
        countGuessesRemaining(letterInput);
        updateWordInProgress(guessedLetters);
        //getWord();
    }
};


/*Show letters as they are guessed*/
const showGuessedLetters = function () {
    guessedLettersOutput.innerHTML = "";
    for (const guessedLetter of guessedLetters) {
        const li = document.createElement("li");
        guessedLettersOutput.append(li);
        li.innerText = guessedLetter;
    }
};


/*Change placeholders to reveal letter as it is guessed*/
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
            
        } else {
            showWord.push("●");
            
        }
    } 
    wordInProgress.innerText = showWord.join("");
    playerWon();
};


/*Message appears with number of guesses remaining*/
const countGuessesRemaining = function(letterInput){
    const upperWord = word.toUpperCase();
    if (upperWord.includes(letterInput)) {
        message.innerText = "You guessed a correct letter!";
    } else {
        message.innerText = "The word does not contain that letter. Try again";
        remainingGuesses -= 1;
    }

    if (remainingGuesses === 0){
        message.innerHTML = `The game is over. The word is <span class="highlight">${word.toUpperCase()}</span>.`;
        remainingGuessesSpan.innerText = `no guesses`;
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    } 
};


/*Reveal a winning message once the word is guessed*/
const playerWon = function (){
    if (word.toUpperCase() === wordInProgress.innerText) {
            message.classList.add("win");
            message.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

