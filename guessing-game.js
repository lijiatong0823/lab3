const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const previousGuesses = document.getElementById("previousGuesses");
const feedback = document.getElementById("feedback");
const turnsLeft = document.getElementById("turnsLeft");
const restartButton = document.getElementById("restartButton");
let answer = randomInt();
let guesses = [];
function endGame() {
  guessInput.disabled = true;
  guessButton.disabled = true;
  restartButton.hidden = false;
}
function checkGuess() {
  const guess = Number(guessInput.value);
  if (guessInput.value === "" ||
      !Number.isInteger(guess) ||
      guess < 1 ||
      guess > 100) {
    feedback.textContent = "Please enter a whole number from 1 to 100.";
    guessInput.focus();
    return;
  }
  guesses.push(guess);
  previousGuesses.textContent =
    "Previous guesses: " + guesses.join(", ");
  turnsLeft.textContent = "Turns left: " + (10 - guesses.length);

  if (guess === answer) {
    feedback.textContent = "Correct! You won!";
    endGame();
  } else if (guesses.length === 10) {
    feedback.textContent =
      "Game over. The number was " + answer + ".";
    endGame();
  } else if (guess < answer) {
    feedback.textContent = "Too low. Try again.";
  } else {
    feedback.textContent = "Too high. Try again.";
  }
  guessInput.value = "";
  if (!guessInput.disabled) {
    guessInput.focus();
  }
}
function restartGame() {
  answer = randomInt();
  guesses = [];
  previousGuesses.textContent = "Previous guesses: None";
  feedback.textContent = "";
  turnsLeft.textContent = "Turns left: 10";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  restartButton.hidden = true;
  guessInput.focus();
}

guessButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restartGame);