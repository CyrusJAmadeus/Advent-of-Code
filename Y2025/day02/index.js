import fs from "node:fs";

try {
  const data = fs.readFileSync("input.txt", "utf8").split(",");
  let totalOne = 0;
  let totalTwo = 0;
  for (const line of data) {
    totalOne += checkPairs(line, isInvalid);
    totalTwo += checkPairs(line, isRepeated);
  }
  console.log(`${totalOne}\n${totalTwo}`);
} catch (err) {
  console.error(err);
}

function isInvalid(id) {
  const str = id.toString();
  const sep = Math.floor(str.length / 2);
  const left = str.slice(0, sep);
  const right = str.length % 2 === 0 ? str.slice(sep) : str.slice(sep + 1);

  return left === right && str.length % 2 === 0;
}

function isRepeated(id) {
  const str = id.toString();
  const sep = Math.floor(str.length / 2);
  for (let i = 1; i <= sep; i++) {
    const chunk = str.slice(0, i);
    const regex = new RegExp(`^(${chunk})+$`);
    if (regex.test(str)) return true;
  }

  return false;
}

function checkPairs(pair, func) {
  const [first, last] = pair.split("-");
  const res = [];

  for (let i = +first; i <= +last; i++) {
    if (func(i)) res.push(i);
  }

  return res.reduce((acc, cur) => acc + cur, 0);
}
