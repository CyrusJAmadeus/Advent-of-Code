import fs from "node:fs";

try {
  const data = fs
    .readFileSync("input.txt", "utf8")
    .split("\n")
    .map((line) => line.split(","));

  const rects = findRects(data);
  const areas = findArea(rects).sort((a, b) => b - a);
  console.log(areas[0]);
} catch (err) {
  console.error(err);
}

function findRects(list) {
  const rects = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[i][0] !== list[j][0] && list[i][1] !== list[j][1])
        rects.push([list[i], list[j]]);
    }
  }
  return rects;
}

function findArea(rects) {
  const areas = [];
  for (const [rect1, rect2] of rects) {
    areas.push(
      (Math.abs(rect1[0] - rect2[0]) + 1) * (Math.abs(rect1[1] - rect2[1]) + 1)
    );
  }
  return areas;
}
