'use strict';
// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Setting up game conditions

diceEl.classList.add('hidden');
let scores, playing, currentScore, activePlayer;
const initialize = function () {
  score0El.textContent = '0';
  score1El.textContent = '0';
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  playing = true;

  diceEl.classList.remove('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initialize();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1: if true, switch player
    if (dice != 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to activePlayer score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player's score is higher or equal to 100
    if (scores[activePlayer] >= 10) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }
    //switch player
    switchPlayer();
  }
});
btnNew.addEventListener('click', initialize);
