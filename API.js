const marked = require("marked");
const fs = require("fs");
const Path = require("path");
const {
  lstatSync,
  readdirSync
} = require("fs");
const {
  join
} = require("path");
const fetch = require("node-fetch");

function mdLinkExtractor(markdown) {
  let links = [];

  let renderer = new marked.Renderer();

  renderer.link = function (href, title, text) {
    links.push({
      href,
      text,
    });
  };

  marked(markdown, {
    renderer: renderer,
  });

  return links;
}


let markdown = fs.readFileSync("./test/mocks/node.md").toString();
let result = mdLinkExtractor(markdown);

let path = "./test/mocks/node.md";

fs.lstat(path, (err, stats) => {
  if (err) return console.log(err);
  console.log(`Is file: ${stats.isFile()}`);
  console.log(`Is directory: ${stats.isDirectory()}`);
});

const getResultInArray = (dir) => {
  let arrayOfMds = fs.readdirSync(dir).filter(file => {
    console.log(file);
    const path = Path.join(dir, file);
    if (fs.lstatSync(path).isDirectory()) {
      traverseSync(path);
    }
    return path
  })
  return arrayOfMds;
}

function getMD(path) {
  return console.log(path)
}


const traverseSync = (dir, getMD) => ({
  path: dir,
  children: fs.readdirSync(dir).map(file => {
    const path = Path.join(dir, file);
    const isMd = Path.extname(file) === ".md";
    const isDirectory = fs.lstatSync(path).isDirectory();
    if (isDirectory) {
      traverseSync(path);
    } else if (isMd) {
      console.log("getMD", getMD, path)
      return {
        path
      }
    } else {
      return {
        path
      }
    }

  })
});


console.log(traverseSync("./test/mocks", getMD));

files = fs.readdirSync(__dirname);

console.log("\Filenames with the .md extension:");
files.forEach(file => {
  if (Path.extname(file) == ".md")
    console.log(file);
})



const filterMds = (paths) => {

}

const fetchPromises = (result) => result.map((result) => fetch(result));
let allFetchs = (promises) => Promise.all(promises);
allFetchs(fetchPromises(result)).then((fetchsResult) => {
  return fetchsResult.map((result) => {
    href: result.url;
    status: result.status;
    text: result.statusText;
  });
}).catch((error) => console.error(error));

console.error("fail");