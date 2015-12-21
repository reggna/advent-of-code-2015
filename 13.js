"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

// Returns a permuted array with a given length.
// Example, given a length of 1, returns:
// [ [ 1, 0 ], [ 0, 1 ] ]
// and given a length of 2 it returns:
// [ [ 2, 1, 0 ], [ 1, 2, 0 ], [ 1, 0, 2 ],
//   [ 2, 0, 1 ], [ 0, 2, 1 ], [ 0, 1, 2 ] ]
// &c.
function create_permute_array(length) {
  if (length <= 0) return [[0]];
  let ret = [];
  for (let i of create_permute_array(length-1)) {
    for (let j = 0; j <= i.length; j++) {
      let c = i.slice(); // create a copy of i
      c.splice(j, 0, length); // add current number at index j
      ret.push(c);
    }
  }
  return ret;
}

let paths = [];
let count = 0;
let guests = {};

function getGuestIndex(guest_name) {
  if (guests[guest_name] !== undefined)
    return guests[guest_name];
  return guests[guest_name] = count++;
}

function addHappinessUnits(p1, p2, happiness) {
  if (paths[p1] === undefined)
    paths[p1] = [];
  paths[p1][p2] = happiness;
}

// Creates an array with all possible combinations of seatings, and calculate
// the happiness units for that arrangement:
function getPossibleHappinessUnits() {
  return create_permute_array(count-1).map(v => v.reduce(function(last, c, i) {
      if (i === 0) return paths[v[v.length-1]][c] + paths[c][v[v.length-1]];
      return last + paths[v[i-1]][c] +  paths[c][v[i-1]];
  }, 0));
}

stdin.on('data', function(data) {
  if (data === '\n') {
    let max_happiness = Math.max(...getPossibleHappinessUnits());

    // Add myself as guest:
    let me = getGuestIndex("ME!");
    let nr_guests = count-1;
    for (let i = 0; i < nr_guests; i++) {
      addHappinessUnits(me, i, 0);
      addHappinessUnits(i, me, 0);
    }

    let max_happiness_with_me = getPossibleHappinessUnits().reduce((l, c) => l > c ? l : c);

    console.log(`Part 1: ${max_happiness}, Part 2: ${max_happiness_with_me}`);
    process.exit();
  }

  // Parse input...
  data = data.slice(0, -2).replace("would gain ", '').replace("would lose ", '-').replace("happiness units by sitting next to ", '').split(" ");
  let p1 = getGuestIndex(data[0]);
  let p2 = getGuestIndex(data[2]);
  let happinesunits = ~~data[1];
  addHappinessUnits(p1, p2, happinesunits);
});

console.log("Paste input, end with enter.");
