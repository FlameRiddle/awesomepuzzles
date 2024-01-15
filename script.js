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
          array[id] = loop(array[id]);
          array[id + 1] = loop(array[id + 1]);
          break;
        case count - 1:
          array[id] = loop(array[id]);
          array[id - 1] = loop(array[id - 1]);
          break;
        default:
          array[id] = loop(array[id]);
          array[id + 1] = loop(array[id + 1]);
          array[id - 1] = loop(array[id - 1]);
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

// make numbers go around
function loop(u) {
  if (u == max - 1) {
    return 0;
  } else {
    return u + 1;
  }
}
