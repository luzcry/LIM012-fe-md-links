const marked = require("marked");
const fs = require("fs");

function mdLinkExtractor(markdown) {
  var links = [];

  var renderer = new marked.Renderer();

  renderer.link = function (href, title, text) {
    links.push({ href, text });
  };

  marked(markdown, { renderer: renderer });

  return links;
}

let markdown = fs.readFileSync("./node.md").toString();
let result = mdLinkExtractor(markdown);
console.log(result);
