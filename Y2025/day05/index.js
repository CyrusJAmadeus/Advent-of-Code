import fs from "node:fs";

try {
  const data = fs.readFileSync("input.txt", "utf8").split("\n");
  const empty = data.indexOf("");
  const ranges = data
    .slice(0, empty)
    .map((line) => line.split("-"))
    .map((range) => [Number(range[0]), Number(range[1])]);
  const ids = data.slice(empty + 1).map((id) => Number(id));
  const numFresh = ids
    .map((id) => isFresh(ranges, id))
    .filter((val) => val).length;

  //   console.log(ranges);
  //   console.log(ids);
  console.log(numFresh);
  console.log(inRange(ranges));
} catch (err) {
  console.error(err);
}

function isFresh(ranges, id) {
  for (const range of ranges) {
    if (id >= range[0] && id <= range[1]) {
      return true;
    }
  }
  return false;
}

function inRange(ranges) {
  const edges = ranges;
  edges.sort((a, b) => a[0] - b[0]);
  //   console.log(edges);
  let i = 0;
  let j = 1;
  const mustDelete = [];
  while (j < edges.length) {
    if (edges[j][0] <= edges[i][1]) {
      edges[i][1] = edges[i][1] > edges[j][1] ? edges[i][1] : edges[j][1];
      mustDelete.push(edges[j]);
      j++;
    } else {
      i = j;
      j++;
    }
  }

  //   console.log(mustDelete);

  for (const val of mustDelete) {
    const index = edges.indexOf(val);
    if (index > -1) edges.splice(index, 1);
  }

  //   console.log(edges);

  const total = edges
    .map((range) => range[1] - range[0] + 1)
    .reduce((acc, cur) => acc + cur, 0);

  return total;
}
