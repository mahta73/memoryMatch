"use strict"

/* global variables go here: */

// keeps track of cells
let cells = [];

// keeps track of the clicked cells
let clickedArray = [];

// keeps tack of cards' values
let cardValues = [];

let interval;
let isStarted = false;
let time = 0;

// indicates wether or not the application is able to handle click event
// the application will be temporarily unable to handle click events when
// and incorrect match attempt is made
let isReady = true;
// keeps tack of the number of cells that have been completed
let numOfCompletedCells = 0;

/* function definitions go here: */

// timer function
let startTimer = function() {
  if (isStarted === false) {
    isStarted = true;
    interval = setInterval( () => {
      time++;
      document.getElementById("displayTimer").innerHTML = time;
    }, 1000);
  }
}

// sort the values in random order
let randomCards = function() {
  let values = [1, 3, 2, 4, 3,"O_O", 1, 2, 4];
  values.sort( (one, two) => 0.5 - Math.random() );
  return values;
};

// reveal the value behind the card
let reveal = function(cell) {
  cell.style.backgroundColor = "#ff00bf";
  cell.innerHTML = cell.value;
  cell.click = true;
};

// hide the valud behind the card
let hide = function(cell) {
  cell.style.backgroundColor = "pink";
  cell.innerHTML = "";
  cell.clicked = false;
};

// cell is matched
let matched = function(cell) {
  numOfCompletedCells++;
  cell.completed = true;
  cell.style.backgroundColor = "#40ff00	";
  console.log(cells);
  cells = cells.filter( (currentElement) => currentElement.value != cell.value);
  console.log(cells);
};



let Cell = function(cell, i) {

  cell.value = cardValues[i];
  cell.isComplete = false;
  cell.isClicked = false;

  cell.addEventListener("mouseenter", () => {
    if (cell.isComplete === false && cell.isClicked === false) {
      cell.style.opacity = "0.8";
    }
  });

  cell.addEventListener("mouseleave", () => {
    if (cell.isComplete === false && cell.isClicked === false) {
      cell.style.opacity = "1";
    }
  });

  cell.addEventListener("click", () => {
    if (isReady === false) {
      return;
    }

    startTimer();
    clickedArray.push(cell);
    reveal(cell);

    if (clickedArray.length === 2) {
      if (clickedArray[0].value === clickedArray[1].value) {
        matched(clickedArray[0]);
        matched(clickedArray[1]);

        clickedArray = [];

        if(numOfCompletedCells === 8) {
          document.querySelector('table').style.border = "5px solid blue";
          clearInterval(interval);
        }

      } else {
        isReady = false;

        clickedArray[0].style.border = "5px solid red";
        clickedArray[1].style.border = "5px solid red";

        setTimeout(() => {
          hide(clickedArray[0]);
          hide(clickedArray[1]);

          clickedArray[0].style.border = "1px solid purple";
          clickedArray[1].style.border = "1px solid purple";

          clickedArray = [];
          isReady = true;
        }, 1000);
      }
    }
  });
};

// The "mouseenter"event handler will cause the cells to turn change opacity when hovered over.
//defineCell.prototype.


// The "mouseleave" event handler will allow the cells to return to the opacity 1 when they are not being hovered over.
//defineCell.prototype.






// The setUp() is used to set up the cells to have event handlers and attributes
let setUp = function() {
  let grid = document.getElementsByClassName("box");
  cardValues = randomCards();
  let newCell;

  for (let i = 0; i < grid.length; i++) {
    newCell = Cell(grid[i], i);
    console.log(typeof grid);
    console.log(newCell);
    cells.push = newCell;

  }
  console.log(cells.length);
};


/* execute functions go here: */

setUp();
