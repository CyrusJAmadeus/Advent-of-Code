import fs from "node:fs";

try {
  const data = fs
    .readFileSync("input.txt", "utf8")
    .split("\n")
    .map((line) => line.split(","));

  const groups = Array.from({ length: data.length }, (_, index) => index);
  // console.log(groups);

  const distances = findDistance(data);
  const pairs = calcPairs(distances, 1000);
  const allPairs = calcPairs(distances);

  console.log(allPairs.length);
  const [i, j] = findCircuts(allPairs, groups);
  console.log(data[i][0] * data[j][0]);
} catch (err) {
  console.error(err);
}

function calcPairs(dists, index = dists.length) {
  return dists
    .sort((a, b) => a[2] - b[2])
    .slice(0, index)
    .map((triplet) => [triplet[0], triplet[1]]);
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

function findCircuts(pairs, groups) {
  let links = 0;
  function find(x) {
    if (groups[x] === x) return x;
    return (groups[x] = find(groups[x]));
  }

  function union(x, y) {
    groups[find(y)] = find(x);
  }

  for (const pair of pairs) {
    if (find(pair[0]) !== find(pair[1])) {
      union(...pair);
      links++;
    }
    if (links === groups.length - 1) return pair;
  }

  for (let i = 0; i < groups.length; i++) {
    find(i);
  }
  const sortedGroupLength = Object.values(Object.groupBy(groups, (el) => el))
    .map((value) => value.length)
    .sort((a, b) => b - a);

  const top3 = sortedGroupLength.slice(0, 3);
  return top3.reduce((acc, cur) => acc * cur, 1);
}
