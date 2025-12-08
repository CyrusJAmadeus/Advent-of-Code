import fs from "node:fs";

try {
  const data = fs.readFileSync("input.txt", "utf8").split("\n");
  console.log(numStops(data));
  console.log(numHits(data));
} catch (error) {
  console.error(error);
}

function numStops(data) {
  let numZeros = 0;
  let dial = 50;
  const moves = data.map((move) =>
    move[0] === "L"
      ? 100 - (Number(move.slice(1)) % 100)
      : Number(move.slice(1)) % 100
  );

  for (const move of moves) {
    dial = (dial + move) % 100;
    if (dial === 0) numZeros++;
  }

  return numZeros;
}

function numHits(data) {
  let numZeros = 0;
  let dial = 50;

  data.forEach((move) => (numZeros += Math.floor(Number(move.slice(1)) / 100)));

  const moves = data.map((move) =>
    move[0] === "L" ? -(move.slice(1) % 100) : +(move.slice(1) % 100)
  );

  for (const move of moves) {
    if (move < 0) {
      if (dial + move <= 0 && dial > 0) numZeros++;
      dial = (dial + move + 100) % 100;
    }

    if (move > 0) {
      if (dial + move >= 100) numZeros++;
      dial = (dial + move) % 100;
    }
  }

  return numZeros;
}
