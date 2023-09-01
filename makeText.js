/** Command-line tool to generate Markov text. */
const process = require("process");
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");

function createText(string, length = 100) {
  let markovResponse = new markov.MarkovMachine(string);
  return markovResponse.makeText(length);
}

function generateFromFile(filePath, length = 100) {
  fs.readFile(filePath, "utf-8", (error, data) => {
    if (error) {
      console.error(`File not found/Can't be read: ${filePath}`);
      process.exit(1);
    } else {
      console.log(createText(data, length));
    }
  });
}

async function generateFromURL(filePath, length = 100) {
  let response;

  try {
    response = await axios.get(filePath);
  } catch (error) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  console.log(createText(response.data, length));
}

console.log(process.argv);
let operation = process.argv[2];
let filePath = process.argv[3];
let length = process.argv[4];

switch (operation) {
  case "file":
    generateFromFile(filePath, length);
    break;
  case "url":
    generateFromURL(filePath, length);
    break;
  default:
    console.error("Please enter a valid operation: file, url");
    process.exit(1);
}
