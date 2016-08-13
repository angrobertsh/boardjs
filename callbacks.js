class Clock {

  constructor() {
    // 1. Create a Date object.
    let date = new Date();
    // 2. Store the hours, minutes, and seconds.
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    // 3. Call printTime.

    // 4. Schedule the tick at 1 second intervals.

    global.setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    let formattedTime = `${this.hours}:${this.minutes}:${this.seconds}`;
    // Format the time in HH:MM:SS
    console.log(formattedTime);
    // Use console.log to print it.
//    global.setInterval(this._tick(), 1000);
  }

  _tick() {

    // 1. Increment the time by one second.
    if (this.seconds < 59) {
      this.seconds += 1;
    } else {
      this.seconds = 0;
      if (this.minutes === 59) {
        this.hours += 1;
        this.minutes = 0;
      } else {
        this.minutes += 1;
      }
    }
    // 2. Call printTime.

    this.printTime();
  }
}

// const clock = new Clock();


const readline = require('readline');

const reader = readline.createInterface({
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft === 0) {
    completionCallback(sum);
  }

  reader.question('Please enter a number', function(num) {
    sum += parseInt(num);
    console.log(sum);
    addNumbers(sum, numsLeft-1, completionCallback);
    reader.close();
  });

}
//addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

// Write this first.
function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  reader.question(`Is ${el1} greater than ${el2}?`, function(input){
    if (input === 'yes') {
      // callback if true; else false.
      callback(true);
    } else if (input === 'no') {
      callback(false);
    }

  });
}

  //askIfGreaterThan(1, 2, function(input) { console.log(input);});

// Once you're done testing askIfGreaterThan with dummy arguments, write this.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {

  // Do an "async loop":

  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.

  if (i === arr.length - 1) {
    // console.log("it works");
    outerBubbleSortLoop(madeAnySwaps);
  } else {
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
      if (isGreaterThan)  {
        madeAnySwaps = true;
        let temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;

        // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
        //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
        //    continue the inner loop. You'll want to increment i for the
        //    next call, and possibly switch madeAnySwaps if you did swap.
      }
      i++;
      innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop);
    });
  }
}

// innerBubbleSortLoop([5,4,3], 0, false, function(a) {console.log(a);} );

// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    if (madeAnySwaps === true) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      // `sortCompletionCallback`.
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
  // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});

Function.prototype.myBind = function (context) {
  return () => this.apply(context);
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"
