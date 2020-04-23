const marked = require("marked");
const fs = require("fs");
const Path = require("path");
const {
  lstatSync,
  readdirSync
} = require('fs')
const {
  join
} = require('path')
/*var validUrl = require("valid-url");*/

function mdLinkExtractor(markdown) {
  var links = [];

  var renderer = new marked.Renderer();

  renderer.link = function (href, title, text) {
    links.push({
      href,
      text
    });
  };

  marked(markdown, {
    renderer: renderer
  });

  return links;
}

let markdown = fs.readFileSync("./node.md").toString();
let result = mdLinkExtractor(markdown);
console.log(result);

let path = "./node.md";

fs.lstat(path, (err, stats) => {

  if (err)
    return console.log(err); //Handle error

  console.log(`Is file: ${stats.isFile()}`);
  console.log(`Is directory: ${stats.isDirectory()}`);
});



const traverseSync = dir => ({
  path: dir,
  children: fs.readdirSync(dir).map(file => {
    const path = Path.join(dir, file);
    return fs.lstatSync(path).isDirectory() ?
      traverseSync(path) : Path.extname(path) === ".md" ? mdLinkExtractor(fs.readFileSync(path).toString()) : path;
  })
});

console.log(traverseSync("./"));