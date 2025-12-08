import fs from "node:fs";

try {
  const data = fs
    .readFileSync("input.txt", "utf8")
    .split("\n")
    .map((str) => str.split(""))
    .map((arr) => arr.map((val) => Number(val)));

  const joltage = data
    .map((arr) => findMax(arr, 12))
    .reduce((acc, cur) => acc + cur, 0);

  console.log(joltage);
} catch (err) {
  console.error(err);
}

// Solution for the part one
// function findMax(arr) {
//   const max = Math.max(...arr);
//   const index = arr.indexOf(max);

//   if (index === arr.length - 1) {
//     const next = Math.max(...arr.slice(0, arr.length - 1));
//     return 10 * next + max;
//   }
//   return 10 * max + Math.max(...arr.slice(index + 1));
// }

// Generalized solution for both part: len = 2 for part 1 and len=12 for part 2
function findMax(arr, len) {
  const answer = new Array(len);
  let start = 0;

  for (let i = 1; i <= len; i++) {
    const subArr = arr.slice(start, arr.length - len + i);
    const max = Math.max(...subArr);
    const index = start + subArr.indexOf(max);
    start = index + 1;
    answer[i] = max;
  }
  // console.log(answer.join(""));
  return Number(answer.join(""));
}
