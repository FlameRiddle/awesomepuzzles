"use strict";
const main = document.querySelector("#main");
const input1 = document.querySelector("#count");
const input2 = document.querySelector("#max");
const start = document.querySelector("button");
let count, max, array;

// check array for win conditions
function win(c) {
  for (let i = 0; i < c.length; i++) {
    if (c[i] !== 0) {
      return 0;
    }
  }
  return 1;
}

// make numbers go around
function loop(direction, number) {
  switch (direction) {
    case "decrement":
      if (number == 0) {
        return max - 1;
      } else {
        return number - 1;
      }
    case "increment":
      if (number == max - 1) {
        return 0;
      } else {
        return number + 1;
      }
  }
}

// generate on click
function generate() {
  count = input1.value;
  max = input2.value;
  main.innerHTML = "";
  array = [];

  // initial randomization
  for (let i = 0; i < count; i++) {
    main.innerHTML += '<a id="' + i + '"></a>';
    array.push(Math.floor(Math.random() * max));
  }
  main.innerHTML += '<button onclick="solve()">solve!!</button>';
  // if won immediately restart
  if (win(array) == 1) {
    generate();
  }
  update();

  // main incrementing mechanic
  document.querySelectorAll("a").forEach((element) => {
    const id = Number(element.id);
    element.addEventListener("click", () => {
      switch (id) {
        case 0:
          array[id] = loop("increment", array[id]);
          array[id + 1] = loop("increment", array[id + 1]);
          break;
        case count - 1:
          array[id] = loop("increment", array[id]);
          array[id - 1] = loop("increment", array[id - 1]);
          break;
        default:
          array[id] = loop("increment", array[id]);
          array[id + 1] = loop("increment", array[id + 1]);
          array[id - 1] = loop("increment", array[id - 1]);
          break;
      }
      update();
    });
  });
}

// update slots
function update() {
  for (let i = 0; i < count; i++) {
    document.getElementById(i).innerText = array[i];
  }
  // check if won
  if (win(array) == 1) {
    main.innerHTML +=
      '<p>congrats!!</p><button id="restart">try again</button>';
    document.querySelector("#restart").addEventListener("click", () => {
      location.reload();
    });
  }
}

function convertToString(c) {
  return c.toString().replace(/,/g, "");
}
function convertToArray(c) {
  return c.split("").map((str) => {
    return parseInt(str, 10);
  });
}

function solve() {
  const solutions = { step0: [] };
  let temp = [];
  for (let i = 0; i < count; i++) {
    temp.push(0);
  }
  solutions["step0"].push(convertToString(temp));

  let i = 0;
  do {
    solutions["step" + (i + 1)] = [];
    solutions["step" + i].forEach((element) => {
      for (let j = 0; j < count; j++) {
        temp = convertToArray(element);
        switch (j) {
          case 0:
            temp[j] = loop("decrement", temp[j]);
            temp[j + 1] = loop("decrement", temp[j + 1]);
            break;
          case count - 1:
            temp[j] = loop("decrement", temp[j]);
            temp[j - 1] = loop("decrement", temp[j - 1]);
            break;
          default:
            temp[j] = loop("decrement", temp[j]);
            temp[j + 1] = loop("decrement", temp[j + 1]);
            temp[j - 1] = loop("decrement", temp[j - 1]);
            break;
        }
        if (isElementInArray(solutions, convertToString(temp)) == false) {
          solutions["step" + (i + 1)].push(convertToString(temp));
        }
      }
    });
    i++;
  }while(solutions["step" + (i)].length > 0)
  console.log(solutions);
}

function isElementInArray(dictionary, element) {
  for (const array of Object.values(dictionary)) {
    if (array.includes(element)) {
      return true;
    }
  }
  return false;
}
