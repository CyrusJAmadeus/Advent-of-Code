import fs from "node:fs";

try {
  const data = fs.readFileSync("input.txt", "utf8").split("\n");
  const spliterLines = data.filter((line) => line.includes("^"));
  const startIndex = data[0].indexOf("S");
  console.log(findSplits(startIndex, spliterLines));
  console.log(findRouts(startIndex, spliterLines));
} catch (err) {
  console.error(err);
}

function findSplits(start, spliters) {
  let counter = 0;
  const beams = new Set([start]);
  for (const line of spliters) {
    beams.forEach((index) => {
      if (line[index] === "^") {
        counter++;
        beams
          .add(index - 1)
          .add(index + 1)
          .delete(index);
      }
    });
  }
  return counter;
}

function findRouts(start, spliters) {
  const quantumLine = new Array(spliters[0].length).fill(0);
  quantumLine[start] = 1;
  const beams = new Set([start]);
  for (const line of spliters) {
    beams.forEach((index) => {
      if (line[index] === "^") {
        beams
          .add(index - 1)
          .add(index + 1)
          .delete(index);

        quantumLine[index - 1] += quantumLine[index];
        quantumLine[index + 1] += quantumLine[index];
        quantumLine[index] = 0;
      }
    });
    // console.log(quantumLine);
  }

  return quantumLine.reduce((acc, cur) => acc + cur, 0);
}
