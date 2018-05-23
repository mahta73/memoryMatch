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
cardValues = (function() {
  let values = [1, 3, 2, 4, 3,"O_O", 1, 2, 4];
  values.sort( (one, two) => 0.5 - Math.random() );
  return values;
})();

// reveal the value behind the card
let reveal = function() {
  this.style.backgroundColor = "#ff00bf";
  this.innerHTML = this.value;
  this.isClicked = true;
};

// hide the valud behind the card
let hide = function() {
  this.style.backgroundColor = "pink";
  this.innerHTML = "";
  this.isClicked = false;
};

// cell is matched
let matched = function() {
  numOfCompletedCells++;
  this.isComplete = true;
  this.style.backgroundColor = "#40ff00	";

  this.addEventListener = null;
  // cells = cells.filter( (currentElement) => currentElement.value != this.value);
};


let Cell = function(i) {

  this.value = cardValues[i];
  this.isComplete = false;
  this.isClicked = false;


  this.addEventListener("mouseenter", () => {
    if (this.isComplete === false && this.isClicked === false) {
      this.style.opacity = "0.8";
    }
  });

  this.addEventListener("mouseleave", () => {
    if (this.isComplete === false && this.isClicked === false) {
      this.style.opacity = "1";
    }
  });


  this.addEventListener("click", () => {

    if (isReady === false || this.isComplete === true) {
      return;
    }
    startTimer();

    clickedArray.push(this);
    reveal.call(this);

    /*
    if ( clickedArray[0].id === clickedArray[1].id ) {
      console.log("You cannot press the same box twice");
      clickedArray.pop();
    }
    */

    if (clickedArray.length === 2) {
      console.log("nice");
      if (clickedArray[0].value === clickedArray[1].value && clickedArray[0].id !== clickedArray[1].id) {

        matched.call(clickedArray[0]);
        matched.call(clickedArray[1]);

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
          hide.call(clickedArray[0]);
          hide.call(clickedArray[1]);

          clickedArray[0].style.border = "1px solid purple";
          clickedArray[1].style.border = "1px solid purple";

          clickedArray = [];
          isReady = true;
        }, 1000);
      }
    }
  });
};

// The setUp() is used to set up the cells to have event handlers and attributes
let setUp = function() {
  let grid = document.getElementsByClassName("box");
  console.log(grid);

  for (let i = 0; i < grid.length; i++) {

    cells.push( Cell.call(grid[i], i) );
  }
};


/* execute functions go here: */

setUp();
