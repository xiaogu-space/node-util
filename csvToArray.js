const fs = require("fs");

function readCsv(filename) {
    const data = fs.readFileSync(filename, "utf8");
    const lines = data.split("\n");
    const result = [];
    for (const line of lines) {
        const row = line.split(",");
        result.push(row);
    }
    return result;
}
function saveJson(jsonString, filename) {
    const jsonData = JSON.parse(jsonString);
    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));
  }


const data = readCsv("./data/报告csv.csv");

const filename = "./data/报告json.json";
saveJson(JSON.stringify(data), filename);
console.log("成功");