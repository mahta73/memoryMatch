"use strict"

/* global variables go here: */



/* function definitions go here: */

// sort the values in random order
let randomCards = function() {
  let values = [1, 1, 2, 2, 3, 3, 4, 4, "O_O"];
  values.sort( (one, two) => 0.5 - Math.random() );
  return values;
}

// The setUp() is used to set up the cells to have event handlers and attributes
let setUp = function() {
  let grid = document.getElementsByClassName("box");
  let cardValues = randomCards();
  let cells = [];

  debugger;
  for (let i = 0; i < grid.length; i++) {
    cells.push( grid[i] );

    cells[i].value = cardValues[i];
    cells[i].isComplete = false;
    cells[i].isClicked = false;

    cells[i].addEventListener("mouseenter", () => {
      if (cells[i].isComplete === false && cells[i].isClicked === false) {
        cells[i].style.opacity = "0.8";
      }
    });

    cells[i].addEventListener("mouseleave", () => {
      if (cells[i].isComplete === false && cells[i].isClicked === false) {
        cells[i].style.opacity = "1";
      }
    });
  }
  cells.forEach( (currentElement) => console.log(currentElement.value));
}


/* execute functions go here: */

new setUp();
