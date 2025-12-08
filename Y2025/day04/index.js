import fs from "node:fs";

try {
  const data = fs.readFileSync("input.txt", "utf8").split("\n");
  const map = data.map((row) => row.split(""));
  const total = findAdjs(data);
  const repeatTotal = findAdjAlter(map);
  console.log(total);
  console.log(repeatTotal);
} catch (err) {
  console.error(err);
}

function counter(row) {
  let numRolls = [];
  for (let i = 0; i < row.length; i++) {
    let rolls = 0;
    if (i === 0) rolls = countRolls([".", row[i], row[i + 1]]);
    else if (i === row.length - 1)
      rolls = countRolls([row[i - 1], row[i], "."]);
    else rolls = countRolls([row[i - 1], row[i], row[i + 1]]);

    numRolls.push(rolls);
  }
  return numRolls;
}

function countRolls(triplet) {
  return triplet.filter((el) => el === "@").length;
}

function findAdjs(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    const rolls = [];
    let before;
    let after;
    if (i === 0) {
      before = Array(data[i].length).fill(0);
      after = counter(data[i + 1]);
    } else if (i === data.length - 1) {
      before = counter(data[i - 1]);
      after = Array(data[i].length).fill(0);
    } else {
      before = counter(data[i - 1]);
      after = counter(data[i + 1]);
    }

    for (let j = 0; j < data[i].length; j++) {
      let count = before[j] + after[j];
      if (j === 0 && data[i][j + 1] === "@") count++;
      else if (j === data[i].length - 1 && data[i][j - 1] === "@") count++;
      else {
        if (data[i][j + 1] === "@") count++;
        if (data[i][j - 1] === "@") count++;
      }

      if (data[i][j] !== "@") rolls.push(4);
      else rolls.push(count);
    }
    // console.log(rolls);
    total += rolls.filter((val) => val < 4).length;
  }

  return total;
}

function findAdjAlter(map) {
  const arr = [];
  while (true) {
    let total = 0;
    for (let i = 0; i < map.length; i++) {
      const rolls = [];
      let before;
      let after;
      if (i === 0) {
        before = Array(map[i].length).fill(0);
        after = counter(map[i + 1]);
      } else if (i === map.length - 1) {
        before = counter(map[i - 1]);
        after = Array(map[i].length).fill(0);
      } else {
        before = counter(map[i - 1]);
        after = counter(map[i + 1]);
      }

      for (let j = 0; j < map[i].length; j++) {
        let count = before[j] + after[j];
        if (j === 0 && map[i][j + 1] === "@") count++;
        else if (j === map[i].length - 1 && map[i][j - 1] === "@") count++;
        else {
          if (map[i][j + 1] === "@") count++;
          if (map[i][j - 1] === "@") count++;
        }

        if (map[i][j] !== "@") rolls.push(4);
        else {
          rolls.push(count);
          if (count < 4) {
            map[i][j] = ".";
            // console.log(count);
          }
        }
      }
      // console.log(rolls);
      total += rolls.filter((val) => val < 4).length;
    }
    if (total === 0) break;
    else {
      arr.push(total);
      //   console.log(total);
    }
  }
  return arr.reduce((acc, cur) => acc + cur, 0);
}
