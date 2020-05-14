const marked = require("marked");
const fs = require("fs");
const path = require("path");
const {
  lstatSync,
  readdirSync
} = require("fs");
const axios = require("axios");

const mdDirectoryExtractor = (dir, options) => {
  let walk = function (dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function (file) {
      file = dir + "/" + file;
      let stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {

        results = results.concat(walk(file));
      } else {
        if (path.extname(file) === ".md") {
          results.push(file);
        }
      }
    });
    return results;
  };
  const result = walk(dir);
  let newResult = [];
  result.forEach((file) => {
    newResult = [...newResult, ...mdLinkExtractor(markdown(file), file)];
  });
  if (options.validate) {
    return mdLinksValidate(newResult);
  }
  return newResult;
};

const mdLinksValidate = (links) => {
  const fetchPromises = (links) =>
    links.map((link) =>
        axios.get(link.href)
        .then((result) => {
        return {
          ...result,
          ...link,
        };
      })
      .catch((error) => {
        if (error.response) {
          return {
            status: error.response.status,
            statusText: "fail",
            ...link,
          };
        } else {
          return {
            status: "404",
            statusText: "fail",
            ...link,
          };
        }
      })
    );
  let allFetchs = (promises) => Promise.all(promises);
  return allFetchs(fetchPromises(links)).then((fetchsResult) => {
    return fetchsResult.map((result) => {
      return {
        href: result.href,
        status: result.status,
        ok: result.statusText,
        path: result.path,
        text: result.text,
      };
    });
  });
};

function mdLinkExtractor(markdown, path) {
  let links = [];

  let renderer = new marked.Renderer();

  renderer.link = function (href, _, text) {
    links.push({
      href,
      text,
      path,
    });
  };

  marked(markdown, {
    renderer: renderer,
  });

  return links;
}

const markdown = (route) => fs.readFileSync(route).toString();

const directory = (route) => fs.lstatSync(route).isDirectory();
const file = (route) => fs.lstatSync(route).isFile();

const getMD = (route) => {
  const pathMd = path.extname(route);
  return pathMd === ".md";
};

module.exports = {
  directory,
  markdown,
  getMD,
  mdLinkExtractor,
  file,
  mdLinksValidate,
  mdDirectoryExtractor,
};
