const marked = require("marked");
const fs = require("fs");

const markdownLinkExtractor = require("markdown-link-extractor");
/*const mdLinks = require("md-links");

mdLinks("./some/example.md")
    .then(links => {
        // => [{ href, text, file }]
    })
    .catch(console.error);

mdLinks("./some/example.md", {
        validate: true
    })
    .then(links => {
        // => [{ href, text, file, status, ok }]
    })
    .catch(console.error);

mdLinks("./some/dir")
    .then(links => {
        // => [{ href, text, file }]
    })
    .catch(console.error);
*/




let markdown = fs.readFileSync('./node.md').toString();

let links = markdownLinkExtractor(markdown);

links.forEach(function (link) {
    console.log(link);
});

/*let markdown = fs.readFileSync("./node.md", function (err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});

let links = markdownLinkExtractor(markdown);

links.forEach(function (link) {
    console.log(link);
});*/