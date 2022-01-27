const scoreBoard = document.getElementById("score-el");
const grid = document.getElementById("grid");
const pacManLivesEl = document.getElementById("pacman-lives");
let pacManLives = 3;
let squares = [];
let width = 28;
let score = 0;
let pacManIndex = 490;
let direction;

// SETTING A PREVIOUSLY DEFINED LAYOUT, THAT WILL BE ATTRIBUTED TO THE GAMEBOARD
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

/*
0 - pacdots
1 - wall
2 - ghost lair
3 - powerpellets
4 - white space
*/

// CREATING BASE GAME BOARD
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    squares.push(square);
    if (layout[i] === 0) {
      squares[i].classList.add("pacdots");
    } else if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add("ghost-lair");
    } else if (layout[i] === 3) {
      squares[i].classList.add("powerpellets");
    }
  }
}

createBoard();

//  ADDING PACMAN TO GAME BOARD
squares[pacManIndex].classList.add("pacman");

// CREATING THE GHOSTS
class Ghost {
  constructor(className, startingIndex, speed) {
    this.className = className;
    this.startingIndex = startingIndex;
    this.speed = speed;
    this.isScared = false;
    this.currentIndex = startingIndex;
    this.timerId = NaN;
  }
}

let ghosts = [
  new Ghost("clyde", 347, 250),
  new Ghost("inky", 352, 400),
  new Ghost("blinky", 407, 300),
  new Ghost("pinky", 377, 500),
];

// ADDING GHOSTS TO GAMEBOARD
function addingGhosts() {
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
  });
}
addingGhosts();

// SETTING THE MOVEMENTS FOR THE GHOSTS

function movingGhosts(ghost) {
  // DEFINING THE DIRECTION IN WHICH TO MOVE THE GHOST
  let directions = [+1, -1, +width, -width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    // CHECKING THAT THE NEXT MOVE HAS NO WALLS OR OTHER GHOSTS
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      // REMOVING THE GHOST FROM CURRENT POSITION
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      //   ADDING THE RANDOM DIRECTION TO THE CURRENT INDEX
      ghost.currentIndex += direction;
      // ADDING THE GHOST TO NEXT POSITION
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    // DEFINING WHAT HAPPENS WHEN GHOST CATCHES PACMAN
    if (
      squares[ghost.currentIndex].classList.contains("pacman") &&
      ghost.isScared === false
    ) {
      //   PACMAN RETURNS TO STARTING POSITION
      squares[pacManIndex].classList.remove("pacman");
      pacManIndex = 490;
      squares[pacManIndex].classList.add("pacman");
      //   GHOSTS RETURN TO STARTING POSITION
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      ghost.currentIndex = ghost.startingIndex;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      // LOSE A LIFE
      pacManLives--;
      pacManLivesEl.innerHTML = pacManLives;
      // DEFINING WHAT NEEDS TO HAPPEN TO LOSE GAME
      if (pacManLives === 0) {
        endGame();
      }
    }

    // DEFINING WHAT HAPPENS WHEN GHOST IS SCARED
    if (ghost.isScared === true) {
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.add("scared-ghost");
      //   DEFINING WHAT HAPPENS WHEN PACMAN EATS GHOST
      if (squares[ghost.currentIndex].classList.contains("pacman")) {
        score += 100;
        scoreBoard.innerHTML = score;
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex = ghost.startingIndex;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
    }

    // SETTING THE MOVEMENTS TO GO AT THE GHOST.SPEED SPEED
  }, ghost.speed);
}
ghosts.forEach((ghost) => movingGhosts(ghost));

function unscareGhosts() {
  ghosts.forEach((ghost) => {
    ghost.isScared = false;
  });
}

// DEFINING WHAT HAPPENS WHEN GAME IS LOST
function endGame() {
  document.querySelector("h1").innerHTML = "You LOSE 😫";
  document.removeEventListener("keyup", controlKeys);
  squares[pacManIndex].classList.remove("pacman");
  ghosts.forEach((ghost) => {
    clearInterval(ghost.timerId);
  });
}

// DEFINING HOW GAME IS WON AND WHAT HAPPENS
function winGame() {
  if (score >= 500) {
    document.querySelector("h1").innerHTML = "You WIN 🎉";
    document.removeEventListener("keyup", controlKeys);
    ghosts.forEach((ghost) => {
      clearInterval(ghost.timerId);
    });
  }
}

// DEFINING WHAT HAPPENS WHEN PACMAN "EATS" A PACDOT
function eatingPacdots() {
  if (squares[pacManIndex].classList.contains("pacdots")) {
    squares[pacManIndex].classList.remove("pacdots");
    score++;
    scoreBoard.innerHTML = score;
  }
}

// DEFINING WHAT HAPPENS WHEN PACMAN "EATS" A POWERPELLET
function eatingPowerpellet() {
  // GETTING THE VALUE OF "ISSCARED" FOR EACH GHOST, SO THAT CAN BE USED IN THE IF STATEMENTE BELLOW
  for (let i = 0; i < ghosts.length; i++) {
    var isScaredNow = ghosts[i].isScared;
  }

  if (
    squares[pacManIndex].classList.contains("powerpellets") &&
    isScaredNow === false
  ) {
    squares[pacManIndex].classList.remove("powerpellets");
    score += 10;
    scoreBoard.innerHTML = score;
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unscareGhosts, 10000);
  }
}

// MOVE PACMAN UPON PRESSING ARROW KEYS
function movingPacMan() {
  if (
    !squares[pacManIndex + direction].classList.contains("wall") &&
    !squares[pacManIndex + direction].classList.contains("ghost-lair")
  ) {
    squares[pacManIndex].classList.remove("pacman");
    pacManIndex += direction;
    squares[pacManIndex].classList.add("pacman");
  } else if (pacManIndex === 364 && direction === -1) {
    squares[pacManIndex].classList.remove("pacman");
    pacManIndex = 391;
    squares[pacManIndex].classList.add("pacman");
  } else if (pacManIndex === 391 && direction === 1) {
    squares[pacManIndex].classList.remove("pacman");
    pacManIndex = 364;
    squares[pacManIndex].classList.add("pacman");
  }
  eatingPacdots();
  eatingPowerpellet();
  winGame();
}

// ADDING PACMAN DIRECTIONS USING THE KEYBOARD KEYS
function controlKeys(event) {
  if (event.key === "ArrowLeft") {
    direction = -1;
    movingPacMan();
  } else if (event.key === "ArrowRight") {
    direction = 1;
    movingPacMan();
  } else if (event.key === "ArrowDown") {
    direction = width;
    movingPacMan();
  } else if (event.key === "ArrowUp") {
    direction = -width;
    movingPacMan();
  }
}

document.addEventListener("keyup", controlKeys);
*/
