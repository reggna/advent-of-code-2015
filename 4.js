"use strict"

let crypto = require('crypto');
const stdin = process.stdin;

stdin.setEncoding('utf8');

function md5(key) {
  return crypto.createHash('md5').update(key).digest("hex");
}

stdin.on('data', function(data){
  // remove enter:
  data = data.slice(0, -1);

  let first_with_five_leading_zeroes = 0;
  while(!md5(`${data}${first_with_five_leading_zeroes}`).startsWith("00000"))
    first_with_five_leading_zeroes++

  let first_with_size_leading_zeroes = first_with_five_leading_zeroes;
  while(!md5(`${data}${first_with_size_leading_zeroes}`).startsWith("000000"))
    first_with_size_leading_zeroes++;

  console.log(`Part1: ${first_with_five_leading_zeroes}, Part2: ${first_with_size_leading_zeroes}`);
  process.exit();
});

console.log("Paste input, end with enter.");
