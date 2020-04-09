// list that holds cards and some other useful values

let appIcons = [
  "fa-chrome",
  "fa-opera",
  "fa-edge",
  "fa-firefox",
  "fa-safari",
  "fa-whatsapp",
  "fa-instagram",
  "fa-reddit-alien",
  "fa-chrome",
  "fa-opera",
  "fa-edge",
  "fa-firefox",
  "fa-safari",
  "fa-whatsapp",
  "fa-instagram",
  "fa-reddit-alien",
];
let currentCard;
let firstCard;
let secondCard;
let matchCardnumber = 0;
let movescount = 0;
let ratingvalue = 0;
let timercount = new Timer();

//shuffle the list of cards using the provided "shuffle" method below
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// add each card's HTML code to the HTML page

function createGameBoard() {
  let cardItemList = shuffle(appIcons);

  cardItemList.forEach(function (appIconName, number) {
    // puts card code into HTML

    let cardDeck = document.querySelector(".deck");
    let cardItem = document.createElement("li");

    cardItem.setAttribute("id", number);
    cardItem.setAttribute("name", appIconName);
    cardItem.classList.add("card");
    // establish card listener code
    cardItem.setAttribute("onclick", "startGame(this)");

    const iconItem = document.createElement("i");
    iconItem.classList.add("fa");
    iconItem.classList.add(appIconName);

    cardItem.appendChild(iconItem);
    cardDeck.appendChild(cardItem);
  });
}

// creat matching card function and get the timer started
function startGame(initialCard) {
  timer();

  initialCard.classList.add("open");
  initialCard.classList.add("show");

  if (firstCard && secondCard) {
    //if 0, start to remove class open and show from first & second card

    firstCard.classList.remove("open");
    firstCard.classList.remove("show");

    secondCard.classList.remove("open");
    secondCard.classList.remove("show");

    firstCard = 0;
    secondCard = 0;
  }

  //adding a move count here to every click on a card, and making sure that info is displaying onscreen via moveCounter func
  if (!currentCard) {
    currentCard = initialCard;
    movescount++;

    moveCounter();
  } else {
    //seeing here if the acutal cards clicked on match each other with the id and name properties, then adding a match value to matchCardnumber
    let item = {
      id: initialCard.getAttribute("id"),
      name: initialCard.getAttribute("name"),
    };

    if (checkMatchCard(item)) {
      initialCard.classList.add("match");
      initialCard.removeAttribute("onclick");

      currentCard.classList.add("match");
      currentCard.removeAttribute("onclick");

      matchCardnumber += 1;

      // quick check here to see if the user has finished/won
      gameOver();
    }

    firstCard = initialCard;
    secondCard = currentCard;
    currentCard = 0;

    // clear away the current cards showing
    clearSelectedCards();
  }
}

function checkMatchCard(item) {
  let card = {
    id: currentCard.getAttribute("id"),
    name: currentCard.getAttribute("name"),
    cardIsOpen: currentCard.classList.contains("open"),
  };

  return item.name === card.name && item.id !== card.id && card.cardIsOpen;
}

// remove 'open' and 'show' from the selection that didn't match
function clearSelectedCards() {
  setTimeout(() => {
    if (firstCard) {
      firstCard.classList.remove("open");
      firstCard.classList.remove("show");
      firstCard = 0;
    }

    if (secondCard) {
      secondCard.classList.remove("open");
      secondCard.classList.remove("show");
      secondCard = 0;
    }
  }, 1000);
}

//check if user has finished game, then activate popup and reload game
function gameOver() {
  if (matchCardnumber == 8) {
    let message = document.querySelector(".popup");
    let close = document.querySelector(".close");

    document.querySelector("#moves").textContent = movescount;
    document.querySelector("#rating").textContent = ratingvalue;
    document.querySelector(
      "#timer"
    ).textContent = timercount.getTimeValues().toString();

    message.style.display = "block";

    close.onclick = function () {
      message.style.display = "none";
      location.reload();
    };
  }
}

// function to count the moves and display onscreen
function moveCounter() {
  let movesContainer = document.querySelector(".moves");
  movesContainer.textContent = movescount;
  rating();
}

// Function to play again/restart
function playAgain() {
  let restartbtn = document.querySelector(".restart");
  restartbtn.onclick = function () {
    location.reload();
  };
}

function rating() {
  // checking how many clicks(moves), then reduce stars per certain values
  let stars = [document.querySelectorAll(".fa-star")];
  for (star of stars) {
    if (movescount === 20) {
      star[2].classList.remove("skill-star");
      ratingvalue = "  Not too bad, " + 2;
    } else if (movescount === 25) {
      star[1].classList.remove("skill-star");
      ratingvalue = " Try Harder, " + 1;
    } else if (movescount === 30) {
      star[0].classList.remove("skill-star");
    } else if (movescount <= 19) {
      ratingvalue = " Superb! " + 3;
    }
  }
}

// timer tracker function

function timer() {
  timercount.start();
  timercount.addEventListener("secondsUpdated", function (e) {
    let overallTime = document.querySelector("#overallTime");
    overallTime.textContent = timercount.getTimeValues().toString();
  });
}

createGameBoard();
playAgain();
