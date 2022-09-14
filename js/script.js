const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "lucky";

/*to create placeholders for letters of word*/
const blankWord = function (word) {
    /*the letters of the word become an array*/
    const blankWordLetters = [];
    /*loop through the array and return a dot for each letter*/
    for (const letter of word) {
        console.log(letter);
        blankWordLetters.push("●");
    }
    /*.join("") to separate the objects in the array by one space*/
    wordInProgress.innerText = blankWordLetters.join("");
};

blankWord(word);

guessButton.addEventListener("click", function (e) {
    /*prevent default behavior of clicking a button, the form submitting, and the page reloading*/
    e.preventDefault();
    const letterInput = letter.value;
    console.log(letterInput);
    letter.innerText = "";
});
