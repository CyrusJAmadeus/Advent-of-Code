import fs from "node:fs";

try {
  const data = fs.readFileSync("input.txt", "utf8").split("\n");
  const lines = data.slice(0, data.length - 1).map((line) => extractor(line));
  const lineChars = data
    .slice(0, data.length - 1)
    .map((line) => line.split(""));
  const verticalNums = vertical(lineChars);
  const numbers = inverse(lines);
  const operators = extractor(data[data.length - 1]);

  //   console.log(numbers[0].length);

  //   console.log(numbers);
  //   console.log(operators);

  //   console.log(calcSum(numbers, operators));
  console.log(calcSum(verticalNums, operators));
} catch (err) {
  console.log(err);
}

function extractor(str) {
  const list = [];
  let val = "";
  for (const char of str) {
    if (char !== " ") {
      //   console.log(char);
      val += char;
    } else if (val) {
      list.push(val);
      val = "";
    }
  }
  if (val) list.push(val);
  return list;
}

function inverse(list) {
  const invList = Array.from({ length: list[0].length }, () => []);
  for (const row of list) {
    // console.log(row.length);
    for (let i = 0; i < row.length; i++) {
      invList[i].push(row[i]);
    }
  }
  return invList;
}

function vertical(list) {
  const verticals = [[]];
  let j = 0;
  for (let i = 0; i < list[0].length; i++) {
    let num = "";
    list.forEach((row) => {
      num += row[i];
    });
    if (num.trim()) verticals[j].push(num);
    else {
      j++;
      verticals.push([]);
    }
  }

  return verticals;
}

function calcSum(numbers, operator) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (operator[i] === "+") {
      total += numbers[i].reduce((acc, cur) => +acc + +cur, 0);
      //   console.log(operator[i]);
      //   console.log(numbers[i]);
      //   console.log(total);
    }

    if (operator[i] === "*") {
      total += numbers[i].reduce((acc, cur) => +acc * +cur, 1);
      //   console.log(operator[i]);
      //   console.log(numbers[i]);
      //   console.log(total);
    }
  }
  return total;
}
