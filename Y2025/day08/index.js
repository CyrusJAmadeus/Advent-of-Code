import fs from "node:fs";
import { queryObjects } from "node:v8";

try {
  const data = fs
    .readFileSync("test.txt", "utf8")
    .split("\r\n")
    .map((line) => line.split(","));

  const distances = findDistance(data);
  const pairs = distances
    .sort((a, b) => a[2] - b[2])
    .slice(0, 10)
    .map((triplet) => [triplet[0], triplet[1]]);

  findCircuts(pairs);
  //   console.log(pairs);
} catch (err) {
  console.error(err);
}

function findDistance(list) {
  const distList = [];

  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const dist =
        (list[i][0] - list[j][0]) ** 2 +
        (list[i][1] - list[j][1]) ** 2 +
        (list[i][2] - list[j][2]) ** 2;
      distList.push([i, j, dist]);
    }
  }

  return distList;
}

function findCircuts(pairs) {
  //   const keys = Array.from(new Set(pairs.map((pair) => pair[0])));
  //   const neighbors = Array.from({ length: keys.length }, () => []);
  //   for (let i = 0; i < keys.length; i++) {}
  console.log({
    ...Object.groupBy(pairs, (row) => row[0]),
    ...Object.groupBy(pairs, (row) => row[1]),
  });
}
