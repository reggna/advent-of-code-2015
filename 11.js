"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

const c_i = 'i'.charCodeAt();
const c_o = 'o'.charCodeAt();
const c_l = 'l'.charCodeAt();
const c_z = 'z'.charCodeAt();
const c_a = 'a'.charCodeAt();

function is_forbidden_letter(c) {
  return c === c_i || c === c_o || c === c_l;
}

function have_forbidden_letter(password) {
  for (const c of password)
    if(is_forbidden_letter(c)) return true;
  return false;
}
function have_double_pair(password) {
  let pair1 = '';
  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i-1]) {
      if (pair1 === '')
        pair1 = password[i];
      if (password[i] !== pair1)
        return true;
    }
  }
  return false;
}

function have_abc(password) {
  for (let i = 2; i < password.length; i++)
    if (password[i] === password[i-1]-1 && password[i] === password[i-2]-2) return true;
  return false;
}

function is_safe(password) {
  return have_abc(password) && have_double_pair(password) && !have_forbidden_letter(password);
}

function increase(password, i) {
  password[i] += 1;
  if (password[i] > c_z) {
    password[i] = c_a;
    return increase(password, i+1);
  } else if (is_forbidden_letter(password[i])) {
      password[i] += 1;
  }
  return password;
}

function get_next(password) {
    password = increase(password, 0);
/*  while (!have_double_pair(password)) {
    console.log(password);
    if (password[0] >= password[1])
      password = increase(password, 1);
    password[0] = password[2] !== password[1] ? password[1] : c_a;
  }*/
  return password;
}

stdin.on('data', function(data) {
  let part1 = data.slice(0, -1).split('').map(a => a.charCodeAt()).reverse();
  for (let i = part1.length, found = false; i >= 0; i--) {
    if (found) part1[i] = c_a;
    if (is_forbidden_letter(part1[i])) {
      part1[i]++;
      found = true;
    }
  }
  while(!is_safe(part1)) {
    part1 = get_next(part1);
  }

  let part2 = part1.slice();
  part2 = get_next(part2);
  while(!is_safe(part2)) {
    part2 = get_next(part2);
  }

  part1 = part1.reverse().map(a => String.fromCharCode(a)).join('');
  part2 = part2.reverse().map(a => String.fromCharCode(a)).join('');

  console.log(`Part 1: ${part1}, Part 2: ${part2}`);
  process.exit();
});

console.log("Paste input, end with enter.");
