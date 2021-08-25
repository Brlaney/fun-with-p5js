// Quicksort/sketch.js
// Link to example: https://p5js.org/examples/simulate-quicksort.html

/* The width of each bar is taken as 8. The array 'states'
helps in identifying the pivot index at every step, and 
also the subarray which is being sortedat any given time. */
let values = [];
let states = [];


/* The setup() function is called once when the program 
starts. Here, we fill the array 'values' with random values
and the array 'states' with a value of -1 for each position. */
function setup() {
  let w = windowWidth - 10;
  let h = windowHeight - 10;

  createCanvas(w, h);

  for(let i = 0; i < width/6; i++) {
    values.push(random(height));
    states.push(-1);
  }

  quickSort(0, values.length - 1);
}


// Resize the window (asynchronously)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


/* The statements in draw() function are executed continuously
until the program is stopped. Each statement is executed
sequentially and after the last line is read, the first
line is executed again. */

function draw() {
  background(80, 81, 79);
  for (let i = 0; i < values.length; i++) {
    console.log(i);

    // Colors
    if (states[i] == 0) {

      // Color for the bar at the pivot index
      fill(206, 208, 206); // Light gray
      stroke(255, 255, 255); // White

    } else if (states[i] == 1) {

      // Color for the bars being sorted currently
      fill(25, 25, 25); // Eerie black
      stroke(230, 232, 230); // Platinum
    
    } else {

      // Color for the 'sorted'/finished state bars
      fill(241, 80, 37); // Orange
      stroke(230, 232, 230); // White
    }
    
    // Draw the rectangular bars
    rect(i * 6, height - values[i], 6, values[i]);
   }
}

async function quickSort(start, end) {
  if (start > end) {  // To include the case there's nothing to sort
    return;
  }

  /* partition() returns the index of the pivot element.
  Once partition() is executed, all elements to the  
  left of the pivot element are smaller than it and 
  0all elements to its right are larger than it. 
  Then, the original state is restored. */
  let index = await partition(start, end);
  
  states[index] = -1;
  await Promise.all(
    [quickSort(start, index - 1), 
     quickSort(index + 1, end)
    ]);
}


/* We have chosen the element at the last index as 
the pivot element, but we could've made different
choices, e.g. take the first element as pivot. */
async function partition(start, end) {
  for (let i = start; i < end; i++) {
    
    // Identify the elements being considered currently
    states[i] = 1;
  
  }
 
  let pivotIndex = start; // Quicksort algorithm
  states[pivotIndex] = 0; // make pivot index distinct
  let pivotElement = values[end];

  for (let i = start; i < end; i++) {
    if (values[i] < pivotElement) {
      await swap(i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }

  await swap(end, pivotIndex);

  for (let i = start; i < end; i++) {
    
    // Restore original state
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}


/* swaps elements of 'values' at indices 'i' and 'j' then
adjust the pace of the simulation by changing the value. */
async function swap(i, j) {
  await sleep(25);
  let temp = values[i];
  values[i] = values[j];
  values[j] = temp;
}


/* custom helper function to deliberately slow down
the sorting process and make visualization easy. */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
