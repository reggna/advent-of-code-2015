"use strict"

const stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

let nice_words = 0;
let last_char = '';
let have_two_in_a_row = false;
let vowels = 0;
let have_forbidden_combination = false;

let super_nice_words = 0;
let third = '';
let repeat_with_one_between = false;
let pairs = [];
let have_pair = false;

stdin.on('data', function(data){
  for (const k of data) {
    switch(k) {
      case '\r':
        if (have_two_in_a_row && vowels >= 3 && !have_forbidden_combination)
          nice_words += 1;
        have_two_in_a_row = false;
        vowels = 0;
        have_forbidden_combination = false;

        if (repeat_with_one_between && have_pair)
          super_nice_words += 1;
        repeat_with_one_between = false;
        pairs = [];
        have_pair = false;

        if (last_char === '\r') { // stop when two new lines are seen in a row
          console.log(`Part1: ${nice_words}, Part2: ${super_nice_words}`);
          process.exit();
        }
        break;
      case 'a': case 'e': case 'i': case 'o': case 'u':
        vowels += 1;
        break;
      case 'b':
        have_forbidden_combination = have_forbidden_combination || last_char == 'a';
        break;
      case 'd':
        have_forbidden_combination = have_forbidden_combination || last_char == 'c';
        break;
      case 'q':
        have_forbidden_combination = have_forbidden_combination || last_char == 'p';
        break;
      case 'y':
        have_forbidden_combination = have_forbidden_combination || last_char == 'x';
        break;
    }

    if (k === last_char)
      have_two_in_a_row = true;

    if (k === third)
      repeat_with_one_between = true;

    let pair_index = pairs.findIndex(e => e === (last_char + k));
    if (pair_index >= 0 && pair_index !== pairs.length - 1)
      have_pair = true;
    pairs.push(last_char + k);

    third = last_char;
    last_char = k;
  }
});

console.log("Paste input, end with enter.");
